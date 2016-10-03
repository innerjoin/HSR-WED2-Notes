# HSR-WED2-Notes
## web app to manage personal notes - Testat project for HSR WED2 Module

## Requirements (in German)
Ihre Miniprojekt-Aufgabe besteht darin, eine Notizen-Webapplikation zu programmieren. Es soll möglich sein Notizen zu verwalten. Die Grundlagen bilden die Wireframes, welche den Funktionalitätsumfang zeigen. Zusätzlich definiert das Video „Testat-WED2.mp4“ die dynamische Ansicht der Webseite (z.B. vom Fluiden Design / Validation / Style Switcher). Ihre Aufgabe ist den kompletten Funktionsumfang der Wireframes zu implementieren und die im Video visualisierten Feinheiten zu berücksichtigen.
Am Aussehen dürfen Anpassungen vorgenommen werden.

### Anforderungen

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
| JS / HTML / CSS Qualität                | Wie in WED1 gelernt.z.B. Kein Copy & Paste Code                                                                           |              |

### Einschränkungen
* kein JavaScript auf dem Client
* Fluides Design: Hauptansicht ohne CSS-Grid von Bootstrap FlexBox und Media-Queries müssen eingesetzt werden

