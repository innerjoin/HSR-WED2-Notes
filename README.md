# HSR-WED2-Notes
## web app to manage personal notes - Testat project for HSR WED2 Module

## Setup
### Visual Studio Code
Basiert auf: https://code.visualstudio.com/docs/runtimes/nodejs
### Dependency Management
So wurde Projekt aufgesetzt
* `git init`
* `git pull https://github.com/...`
* `npm init`
* `npm install --save typings`
* ... usw für...
   * node
   * express
   * nedb
   * und allfällige weitere Abhängigkeiten
* `typings init`
* `typings search node`
* `typings install node --save --global --source dt`
* dt allenfalls durch anderes ersetzen, je nachdem was search für ein repository anzeigt.
* instll-Kommando für folgende Erweiterungen wiederholen (search optional, nur um Name herauszufinden)
   * express
   * serve-static
   * express-serve-static-core
   * nedb

### neues Modul hinzufügen
1. Modul installieren:
`npm install --save <mymodule>`
2. Typings suchen
`typings search <mymodule>`
3. Typings installieren
`typings install <mymodule> --save --global --source dt`

## Anforderungen
Ihre Miniprojekt-Aufgabe besteht darin, eine Notizen-Webapplikation zu programmieren. Es soll möglich sein Notizen zu verwalten. Die Grundlagen bilden die Wireframes, welche den Funktionalitätsumfang zeigen. Zusätzlich definiert das Video „Testat-WED2.mp4“ die dynamische Ansicht der Webseite (z.B. vom Fluiden Design / Validation / Style Switcher). Ihre Aufgabe ist den kompletten Funktionsumfang der Wireframes zu implementieren und die im Video visualisierten Feinheiten zu berücksichtigen.
Am Aussehen dürfen Anpassungen vorgenommen werden.

### Kriterienkatalog
| **Anforderungen**                       | **Bemerkungen / geforderte Eigenschaften**                                                          | **Erfüllt?** |
|-----------------------------------------|------------------------------------------------------------------------------------------------------|--------------|
| Editieren und Erfassen von Notizen      | <ul><li>Alle Felder vorhanden</li><li>Alle Input-Typen richtig gesetzt</li><li>Validation vom Input (Title required)</li><li>Wichtigkeit zwischen 1-5</li></ul>                                                                              |              |
| Anzeigen von Einträgen                  | Wie in der Vorgabe (Video)                                                                           |              |
| Sortieren von Notizen                   | <ul><li>Auf und Absteigend</li><li>Bei Seiten-Refresh muss die Sortierung beibehalten werden.</li></ul>                                            |              |
| Filtern von „abgeschlossenen" Notizen   | Bei Seiten-Refresh muss der Filter beibehalten werden.                                               |              |
| Wechseln des Styles                     | Der Style auf Master und Detail anwenden. Bei Seiten-Wechsel sollte die Auswahl beibehalten werden.  |              |
| Fluides Design                          | Die Seite soll auf Smartphone (IPhone 5) und Desktop ordentlich aussehen                             |              |
| Server Struktur                         | <ul><li>Sinnvolle File Struktur.</li><li>z.B. Kein Datenbankzugriff im Controller</li></ul>                                                              |              |
| Datenbank angebunden                    | nedb genutzt                                                                                         |              |
| Keine Daten                             | Ist die Liste der Notizen leer, soll dies auf sinnvolle Weise den Benutzern deutlich gemacht werden. |              |
| JS / HTML / CSS Qualität                | Wie in WED1 gelernt.z.B. Kein Copy & Paste Code                                                      |              |

### Einschränkungen
* kein JavaScript auf dem Client
* Fluides Design: Hauptansicht ohne CSS-Grid von Bootstrap FlexBox und Media-Queries müssen eingesetzt werden

