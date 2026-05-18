import fs from "fs"

const path = "app/page.tsx"
const replacement = Buffer.from([0xef, 0xbf, 0xbd]) // U+FFFD

function fixText(content) {
  const fixes = [
    ["7 cat\uFFFDgories pour r\uFFFDpondre \uFFFD tous vos besoins", "7 catégories pour répondre à tous vos besoins"],
    [
      "Du lavage auto au nettoyage professionnel, nous offrons une gamme compl\uFFFDte de services avec une qualit\uFFFD irr\uFFFDprochable.",
      "Du lavage auto au nettoyage professionnel, nous offrons une gamme complète de services avec une qualité irréprochable.",
    ],
    ['Lavage ext\uFFFDrieur, int\uFFFDrieur', "Lavage extérieur, intérieur"],
    ["Nettoyage canap\uFFFD", "Nettoyage canapé"],
    ["canap\uFFFDs", "canapés"],
    ["D\uFFFDsinfection", "Désinfection"],
    ["qualit\uFFFD", "qualité"],
    ["\uFFFD sec", "à sec"],
    ["Qualit\uFFFD", "Qualité"],
    ["\uFFFD Dakar", "à Dakar"],
    ["S\uFFFDn\uFFFDgal", "Sénégal"],
    ["t\uFFFDl\uFFFDphone", "téléphone"],
    ["r\uFFFDponse", "réponse"],
    ["m\uFFFDthode", "méthode"],
    ["int\uFFFDrieur", "intérieur"],
    ["c\uFFFDramique", "céramique"],
    ["pr\uFFFDc\uFFFDdente", "précédente"],
    ["\uFFFD propos", "À propos"],
    ["d\uFFFDgrad\uFFFDs", "dégradés"],
    ["\uFFFDquipe", "équipe"],
    ["ann\uFFFDes", "années"],
    ["Cat\uFFFDgories", "Catégories"],
    ["D\uFFFDcouvrir", "Découvrir"],
    ["sp\uFFFDcialis\uFFFD", "spécialisé"],
    ["adapt\uFFFDes", "adaptées"],
    ["\uFFFDquipements", "équipements"],
    ["r\uFFFDsultats", "résultats"],
    ["comp\uFFFDtitifs", "compétitifs"],
    ["utilis\uFFFDes", "utilisées"],
    ["derri\uFFFDre", "derrière"],
    ["T\uFFFDl\uFFFDphone", "Téléphone"],
    ["ext\uFFFDrieur", "extérieur"],
    ["mat\uFFFDriel", "matériel"],
    ["\uFFFD ", "à "],
    ["\uFFFD", "—"],
    ["2\uFFFD4", "2 à 4"],
    ["2\uFFFD\uFFFD2", "2×2"],
  ]

  let out = content
  for (const [from, to] of fixes) {
    out = out.split(from).join(to)
  }
  return out
}

let buffer = fs.readFileSync(path)
let start = 0
if (buffer[0] === 0xef && buffer[1] === 0xbf && buffer[2] === 0xbd) {
  start = 3
}

let content = buffer.subarray(start).toString("utf8")
content = fixText(content)

if (!content.startsWith('"use client"')) {
  throw new Error("Bad file start")
}

fs.writeFileSync(path, content, { encoding: "utf8" })
console.log("Done. catégories:", content.includes("catégories"))
