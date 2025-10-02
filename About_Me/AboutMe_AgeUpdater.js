// Geburtsdatum festlegen (JJJJ-MM-DD)
const birthDate = new Date('2006-04-08'); // Setze hier dein Geburtsdatum ein

// Aktuelles Datum abrufen
const today = new Date(); 

// Altersdifferenz in Jahren berechnen
let age = today.getFullYear() - birthDate.getFullYear(); 

// Überprüfen, ob der Geburtstag in diesem Jahr schon war
if (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--; // Alter um 1 reduzieren, wenn der Geburtstag noch nicht war
}

// Aktualisieren des Alters im HTML
document.getElementById('age').innerText = age; 
