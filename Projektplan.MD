# Projektplan

## Introduktion och bakgrund
- **Kortfattad beskrivning av projektets syfte och mål**
- Projektets mål är att utveckla ett IoT-baserat sensorsystem som hjälper bönder och storskaliga växtodlare att optimera vården av sina grödor genom att mäta fuktighet, vattenmängd, solljus och näringsnivåer i jorden. 
Systemet kommunicerar med en databas som analyserar sensordata och ger rekommendationer till användaren via en mobil- och webbapplikation.

- **Beskrivning av problemet som lösningen ska adressera**
- Effektiv växtodling kräver noggrann bevattning och näringshantering, men många bönder saknar tillgång till detaljerad realtidsdata om markförhållandena. 
Manuell övervakning är tidskrävande och kan leda till ineffektiv resursanvändning, vilket påverkar skördens kvalitet och avkastning. Genom att automatisera insamling och analys av fukt-, ljus- och näringsnivåer kan detta system ge bönder insikter för att optimera vattenförbrukning och gödsling, minska onödigt svinn och förbättra skördeutfallet.

- **Eventuella intressenter och målgrupp för produkten**
- Primära användare: Bönder och storskaliga växtodlare inom jordbruk, växthusodling och kommersiell växtproduktion.
- Sekundära intressenter: Jordbruksorganisationer, rådgivare inom agronomi, lantbruksföretag och leverantörer av bevattningssystem.
- Projektteamet: Utvecklare inom frontend, backend och IoT.
Utbildare och mentorer: Ansvariga för att godkänna projektets genomförande.


## Val av teknologi och arkitektur
- **Val av teknologier för frontend, backend och IoT**
- Frontend: React Native, Visual Studio Code, Tailwind, CSS, JavaScript

- Backend: Node.js, Express.js, JavaScript, Visual Studio Code

- IoT: C++, Arduino mikrokontroller, Arduino IDE, Visual studio Code

- **Översikt över systemarkitekturen**

- **Beslut kring databas- och API-struktur**
 - SQL (MongoDB, om det går)

## Teamstruktur och ansvarsområden
- **Gruppens sammansättning – vilka ingår i varje team?**

- Frontend: Amanda Lindström och Sandra Karlberg

- Backend: Jonatan Jarl, Filip Wretner, Andreas, David, Gaston

- IoT: Jonathan Rubin, Dennis Holm, Seref Özbodur, Erik Eriksson, Jessica Sjösten

- **Beskrivning av huvudansvar och arbetsuppgifter för varje team**

-Frontend: Frontend-teamet ansvarar för användargränssnittet och mobilapplikationen. Data hämtas från API och visas upp i appen vilket ger användaren information om växternas status. Inloggningsfunktion, lägga till/ta bort växter, namnge växter.

-Backend: Backend-teamet ansvarar för databashantering, autentisering och API-struktur. Databasen ska kunna ta emot och lagra data från hårdvara och sedan skicka begärd data till frontend med hjälp av API. 

-IoT: IoT gruppen ansvarar för all hårdvara, samt dess programmering och testning. De ansvarar även för att, tillsammans med Backendgruppen, sammanlänka så att databas kan kommunicera med hårdvaran.

- **Hur teamen ska arbeta tillsammans och säkerställa kunskapsöverföring**

## Arbetsmetoder och verktyg
- **Val av agil metodik (Scrum, Kanban eller liknande)**

- **Vilka verktyg som ska användas för:**
- Kodhantering: All kodhantering kommer ske med hjälp av git och github
- Kommunikationskälla: Alla kommunikation sker via Discord 
- Sprintplanering och uppgiftshantering: Jira, kanban
- Hur teamet hanterar standups, sprintplanering, retros och demos: Standup varje tisdag 09:00, två veckors sprintar start och slut på tisdagar. Sen också review, retrospective och planning på tisdagar.
  - Plan för code reviews och pull requests: Ingen mergar till main/develop branch utan review som sker via pull request. Varje team är huvudansvarig för att hantera sina egna pull requests. Man får inte godkänna sin egen pull request.

## Tidsplan och milstolpar
- **Övergripande tidsplan**
- V 13 - 21, Projektarbete enligt plan, två veckors sprintar.
- V 21, Projektet klar, fixa eventuella buggar.
- V 23, Juni Deadline, projektavslut (demo, uppvisning, retro)


#När ni förväntar er att vara klara med:#
- **Första fungerande prototypen (MVP)**
- V 19, tror vi att MVP är klar.
- **Implementering av kärnfunktioner**
- V 17, tror vi att alla gruppernas enskilda kärnfunktioner är klara.
- **Testning & optimering**
- V 19-Framåt Testning och optimering kommer ske vartefter men kommer lägga större fokus när vi har en MVP.

- **Hur teamet hanterar förändringar i tidsplanen om något tar längre tid än förväntat**
- Vi stöttar varandra och kommunicerar kontinuerligt för att se om tidsplanen följs. För att snabbare kunna fokusera våra resurser där det mest krävs. Uppmuntrar alla till öppen kommunikation för att snabbt lokalisera potentiella förhinder.


## Riskanalys och Plan för Problemhantering
- **Vilka risker kan uppstå?**
- Oförutsedda problem i både kod och kommunikation, hårdvarukomponenter kan gå sönder. Sjukdomar och frånvaro.
- **Hur ska ni hantera problem som blockerar utvecklingen?**
- Regelbundna möten och uppföljning i Discord. Testa hårdvaran kontinuerligt om det inte funkar att beställa en ny.
- **Vilka steg tar ni om en teammedlem inte levererar enligt plan?**
- Kommunicera om hur den kan komma tillbaka på banan. Hjälpa varandra till bästa förmåga. Om det sker vid upprepade tillfällen att en teammedlem inte kommunicerat om den ligger efter tidsplanen kommer skolledningen att kontaktas.

## Leveranser och dokumentation
- **Slutproduktens minimikrav (vad MÅSTE vara klart vid projektavslut?).**
- En produkt som mäter fukt i marken, solljus, temperatur, näring (om budget räcker), samt lagrar data och visar data för slutanvändaren. Och styra via en mobilapp.

- **Vad varje team (frontend, backend, IoT) måste leverera**
Alla team måste leverera en fungerande och testad produkt, i enlighet med respektive teams ansvarsområde
- **Vilken dokumentation som ska finnas och vem som ansvarar för den**
- Alla ansvarar för dokumentation som rör dem.
- Readme.md, srs, kanban, API-dokumentation endpoints, kopplingsschema för hårdvaran, resultaten för användartester för Figma, doxy/JSDoc, projektplan

- **Plan för att hålla README och API-dokumentation uppdaterad**
- Tas upp varje sprint-plan

## Slutlig checklista för projektplanen
- **Dokumenteras som PROJEKTPLAN.md i Git-repot**
- **Ska innehålla alla ovanstående punkter innan inlämning vecka 12**
- **Projektplanen skickas till respektive utbildare senast den 21/3 klockan 15.00**
- **Godkännas av utbildare innan utvecklingsarbetet startar**
