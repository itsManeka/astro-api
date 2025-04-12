# 🌌 Mapa Astral API com Swiss Ephemeris (Node.js + Express)

API REST que calcula mapas astrais com base na data, hora e local de nascimento utilizando a biblioteca [Swiss Ephemeris](https://github.com/rsbauer/node-sweph). Ideal para aplicações astrológicas modernas com frontend em React, Next.js ou outros frameworks JavaScript.

---

## ✨ Funcionalidades

- Calcula **signo solar**, **lunar** e **ascendente**
- Determina as **posições planetárias**
- Calcula as **casas astrológicas**
- Retorna os dados completos com base em coordenadas geográficas

---

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [swisseph (Swiss Ephemeris)](https://github.com/rsbauer/node-sweph)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)

---

## 🚀 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/itsmaneka/astro-api.git
cd astro-api

# Instale as dependências
npm install

# Inicie o servidor localmente
node index.js
```

Certifique-se de que a pasta ```swisseph-data/``` esteja no mesmo diretório e contenha os arquivos de efemérides do Swiss Ephemeris.

## 📡 Endpoint
POST /mapa-astral

Calcula e retorna os dados astrológicos com base nas informações fornecidas.

### 🔸 Corpo da Requisição

```json
{
  "date": "1995-10-13",
  "time": "15:30",
  "lat": -23.5505,
  "lng": -46.6333
}
```
### 🔹 Exemplo de Resposta

```json
{
  "signos": {
    "solar": "Libra",
    "lunar": "Peixes",
    "ascendente": "Sagitário"
  },
  "planetas": [
    {
      "nome": "Sol",
      "longitude": 199.87,
      "signo": "Libra"
    },
    ...
  ],
  "casas": [...],
  "ascendente": 270.23,
  "meioDoCeu": 180.56
}
```

## 💻 Exemplo de Consumo com React

```js
await fetch('https://sua-api.onrender.com/mapa-astral', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    date: '1995-10-13',
    time: '15:30',
    lat: -23.5505,
    lng: -46.6333
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🌍 Deploy
Você pode hospedar essa API gratuitamente em:

[Render ✅](https://render.com/)

[Railway ✅](https://railway.app/)

[Glitch ✅](https://glitch.com/)

Basta subir o código e configurar o start script no package.json:

```json
"scripts": {
  "start": "node index.js"
}
```

📁 swisseph-data

Certifique-se de incluir a pasta ```swisseph-data/``` com os arquivos .se1 necessários. Você pode baixar os arquivos oficiais neste [link](https://github.com/aloistr/swisseph).

## 📄 Licença
MIT — sinta-se livre para usar e modificar.