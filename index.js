const express = require('express');
const cors = require('cors');
const swisseph = require('swisseph');
const path = require('path');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

swisseph.swe_set_ephe_path(path.join(__dirname, 'swisseph-data'));

const getSigno = (longitude) => {
    const signos = ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
        'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'];
    return signos[Math.floor(longitude / 30)];
};

app.post('/mapa-astral', (req, res) => {
    try {
        const { date, time, lat, lng } = req.body;

        if (!date || !time || lat == null || lng == null) {
            return res.status(400).json({ error: 'Parâmetros ausentes.' });
        }

        const [year, month, day] = date.split('-').map(Number);
        const [hour, minute] = time.split(':').map(Number);
        const decimalHour = hour + minute / 60;
        const julianDay = swisseph.swe_julday(year, month, day, decimalHour, swisseph.SE_GREG_CAL);

        const planetas = [
            { nome: 'Sol', id: swisseph.SE_SUN },
            { nome: 'Lua', id: swisseph.SE_MOON },
            { nome: 'Mercúrio', id: swisseph.SE_MERCURY },
            { nome: 'Vênus', id: swisseph.SE_VENUS },
            { nome: 'Marte', id: swisseph.SE_MARS },
            { nome: 'Júpiter', id: swisseph.SE_JUPITER },
            { nome: 'Saturno', id: swisseph.SE_SATURN },
            { nome: 'Urano', id: swisseph.SE_URANUS },
            { nome: 'Netuno', id: swisseph.SE_NEPTUNE },
            { nome: 'Plutão', id: swisseph.SE_PLUTO },
            { nome: 'Nodo Lunar', id: swisseph.SE_MEAN_NODE }
        ];

        const resultadosPlanetas = planetas.map(planeta => {
            const r = swisseph.swe_calc_ut(julianDay, planeta.id, 0);
            return {
                nome: planeta.nome,
                longitude: r.longitude,
                signo: getSigno(r.longitude),
            };
        });

        const casas = swisseph.swe_houses(julianDay, lat, lng, 'P');
        const ascendente = casas.ascendant;
        const meioDoCeu = casas.mc;

        const resultado = {
            date,
            time,
            lat,
            lng,
            signos: {
                solar: getSigno(resultadosPlanetas.find(p => p.nome === 'Sol').longitude),
                lunar: getSigno(resultadosPlanetas.find(p => p.nome === 'Lua').longitude),
                ascendente: getSigno(ascendente),
            },
            planetas: resultadosPlanetas,
            casas: casas.house,
            ascendente,
            meioDoCeu
        };

        return res.json(resultado);

    } catch (error) {
        console.error('Erro no mapa astral:', error);
        return res.status(500).json({ error: 'Erro no servidor' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});