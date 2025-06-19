const formulaire = document.getElementById("formulaire")
const BtnAjouter = document.getElementById("ajouter")
const ContenantDuFormulaire = document.getElementById('ContenantDuFormulaire')
const CorpsDuTableau = document.getElementById('CorpsDuTableau')
const FermerModal = document.getElementById('Fermer')
const envoyer = document.getElementById('envoyer')
let indexModification = null;
let Employes = []

//Afficher tout les Employes
function mettreLesEmployesDansLeLocalStorage(){
     
      localStorage.setItem("Employes", JSON.stringify(Employes))      
    
}
function afficherEmployes() {
  CorpsDuTableau.innerHTML = "" 

  //code si aucun employer n'est enregistrer
if(Employes.length == 0){
   const p = document.createElement('p')
   p.textContent = "Aucun Employez n'a ete enregistrer";
   p.style.textAlign = 'center';
   p.style.color = 'red';
  
  
   CorpsDuTableau.appendChild(p)
   return
}
//au moins un Employer est enregistrer 

  Employes.forEach((employe, index) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${employe.nom} ${employe.prenom}</td>
      <td>${employe.email}</td>
      <td>${employe.fonction}</td>
      <td>
        <button class="delete" data-index="${index}">Supprimer</button>
        <button class="modifier" data-index="${index}">Modifier</button>
      </td>
    `
    CorpsDuTableau.appendChild(tr)
  })

  //Fonction pour supprimer un employer
  document.querySelectorAll('.delete').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index')
      Employes.splice(index, 1)
      //mettre les Employes dans le localStorage
      mettreLesEmployesDansLeLocalStorage()
      afficherEmployes()
    })
  })
   //Fonction pour modifier un employer
  document.querySelectorAll('.modifier').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      indexModification = e.target.getAttribute('data-index')
      ContenantDuFormulaire.style.display = "flex"
      formulaire.elements['nom'].value = Employes[indexModification].nom
      formulaire.elements['prenom'].value = Employes[indexModification].prenom
      formulaire.elements['email'].value = Employes[indexModification].email
      formulaire.elements['fonction'].value = Employes[indexModification].fonction
   

      //mettre les Employes dans le localStorage
      mettreLesEmployesDansLeLocalStorage()
      afficherEmployes()
    })
  })
}
// fonction pour retirer les donnees des employes dans le localStorage
function chargerEmployesDepuisLocalStorage() {
  Employes = JSON.parse(localStorage.getItem("Employes")) || []
  afficherEmployes()
}

chargerEmployesDepuisLocalStorage()

formulaire.addEventListener('submit', (e) => {
  e.preventDefault()
  if(!indexModification){
 const formData = new FormData(formulaire)
  const objet = Object.fromEntries(formData.entries())
  Employes.push(objet)
  }
  else{
    envoyer.textContent = 'Modifier';
    Employes[indexModification].nom = formulaire.elements['nom'].value;
    Employes[indexModification].prenom = formulaire.elements['prenom'].value;
    Employes[indexModification].email = formulaire.elements['email'].value;
    Employes[indexModification].fonction = formulaire.elements['fonction'].value;
    indexModification = null;
    ContenantDuFormulaire.style.display = "none"
  }
 
  mettreLesEmployesDansLeLocalStorage()
  afficherEmployes()
  formulaire.reset()
})

BtnAjouter.addEventListener('click', () => {
  ContenantDuFormulaire.style.display = "flex"
})

FermerModal.addEventListener('click', () => {
  ContenantDuFormulaire.style.display = "none"
})
