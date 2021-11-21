# Assignment 5 - Zahlen finden
## Learning Objective
In diesem Assignment geht es um Click-Handler, DOM-Manipulation und die Implementierung einer einfachen Spiellogik.

## Worum geht es?
_"Zahlen finden"_ ist ein Geschicklichkeits-Spiel. Ziel ist es in einem Quadrat der Größe X mal X alle durcheinander 
gewürfelten Zahlen der Reihe nach zu finden (d.h. anzuklicken).

Wurde die richtige, nächste Zahl angeklickt, verschwindet diese aus ihrem Feld.
Wurde die falsche Zahl angeklickt, wird diese rot markiert.

## Tasks
1. Baue ein statisches Frontend mit einer 4x4 Matrix an Zahlen. Sorge dafür, dass die Matrix zentriert als Quadrat dargestellt wird.

2. Implementiere das Javascript-ClickHandling, das prüft, ob die richtige Zahl angeklickt wurde und das oben genannte 
Verhalten auslöst. (Bonus: nutze kein jQuery für das Handling. https://youmightnotneedjquery.com/ )

3. Ersetze den statischen Content durch ein Template. Dieses Template wird für die Zahlen 0 bis 15 jeweils neu 
befüllt und in die Matrix eingefügt. 
Sorge dafür, dass die Zahlen randomisiert angeordnet werden. (Stichwort shuffle)

4. Dynamisiere die Erstellung der Matrix insofern, dass durch ein Auswahl- oder Textfeld die Anzahl der Zahlen festgelegt werden kann und bei Klick auf den "Erstellen"-Button ein neues Rätsel generiert wird.

### Zusatzaufgaben
#### Zusatz 1:
Füge eine Fehler-Counter ein. Wähle einen geeigneten Ort für die Darstellung.

#### Zusatz 2:
Füge einen Zähler ein, der die verbleibenden Zahlen zählt. Wähle einen geeigneten Ort für die Darstellung.

#### Zusatz 3:
Füge eine Stoppuhr ein, die automatisch beim ersten Klick auf eine Zahl startet. Wähle einen geeigneten Ort 
für die Darstellung.

#### Zusatz 4:
Lasse die Zahlen nach 5 Sekunden verschwinden (nicht einfach weiß werden...) und nach Klick tauchen sie wieder auf 
(falls richtig), alle anderen Funktionalitäten bleiben erhalten. Das Spiel muss dann aus dem Kopf gelöst werden.