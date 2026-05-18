class Eleve {
    static numeroActuel = 1;

    constructor(nom, prenom, courriel) {
        this.numero = Eleve.numeroActuel++;
        this.nom = nom;
        this.prenom = prenom;
        this.ddn = null; // Date de naissance
        this.courriel = courriel;
        this.notes = [];
    }

    setDateDeNaissance(jour, mois, annee) {
        this.ddn = new Date(annee, mois - 1, jour);
    }
}
// Question num deux
Eleve.prototype.age = function() {
    if (!this.ddn) return null;
    const diff = Date.now() - this.ddn.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

Eleve.prototype.affiche = function() {
    if (!this.ddn) return `${this.nom.toUpperCase()} ${this.prenom}`;
    const jour = this.ddn.getDate().toString().padStart(2, '0');
    const mois = (this.ddn.getMonth() + 1).toString().padStart(2, '0');
    const annee = this.ddn.getFullYear();
    return `${this.nom.toUpperCase()} ${this.prenom}, né(e) le ${jour}/${mois}/${annee}`;
};
// Question num trois
Eleve.prototype.ajoutNote = function(matiere, note) {
    this.notes.push({ matiere, note });
};
//Question num quatres
Eleve.prototype.moyenne = function() {
    if (this.notes.length === 0) return 0;
    let total = 0;
    for (let i = 0; i < this.notes.length; i++) {
        total += this.notes[i].note;
    }
    return total / this.notes.length;
};
//Question num cinq
function rechercherEleve(eleves, texte) {
    const texteMinuscule = texte.toLowerCase();
    return eleves.filter(eleve =>
        eleve.nom.toLowerCase().includes(texteMinuscule) ||
        eleve.prenom.toLowerCase().includes(texteMinuscule)
    );
}
//Question num six
function annivMois(eleves, mois) {
    return eleves.filter(eleve => eleve.ddn && (eleve.ddn.getMonth() + 1) === mois);
}
// Question num sept
let eleve1 = new Eleve("Dupont", "Jean", "jean.dupont@example.com");
eleve1.setDateDeNaissance(15, 6, 2000);
eleve1.ajoutNote("Math", 15);
eleve1.ajoutNote("Science", 18);

let eleve2 = new Eleve("Martin", "Sophie", "sophie.martin@example.com");
eleve2.setDateDeNaissance(23, 6, 2001);
eleve2.ajoutNote("Math", 12);
eleve2.ajoutNote("Science", 14);

console.log(eleve1.affiche());
console.log("Âge : ", eleve1.age());
console.log("Moyenne : ", eleve1.moyenne());

console.log(eleve2.affiche());
console.log("Âge : ", eleve2.age());
console.log("Moyenne : ", eleve2.moyenne());

let eleves = [eleve1, eleve2];
console.log("Recherche d'élèves : ", rechercherEleve(eleves, "Sophie"));
console.log("Anniversaires en juin : ", annivMois(eleves, 6));
