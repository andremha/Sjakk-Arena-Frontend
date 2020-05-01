const playerHelpPageData = [{
  title: 'Bli med i turnering',
  texts: [
    'For å bli med i en turnering velger du "spill turnering" på hjemmesiden. Der etter fyller du ut skjemaet.',
    ' Game pin får du av turnerings verten. Spillernavn kan vær hvilket som helst navn du ønske å bruke under ' +
      'turneringen.'
  ],
  images: [
    require('@/assets/help-page/player/play_home.jpg'),
    require('@/assets/help-page/player/enter_tournament.jpg')
  ]
},
{
  title: 'Forlat turnering',
  texts: [
    'Det er to måter du kan forlate turneringen på. Det første er å bneytte "Forlat turnering" knappen. Den andre måten' +
      ' er å navigere bort fra siden.',
    'Når du prøver å forlate turneringen vil du få en dialog for å være sikker på at det er dette du ønsker. Huska' +
      ' at å forlate turneringen er en ikke reversibel handling!'
  ],
  images: [
    require('@/assets/help-page/player/leave_tournament.jpg'),
    require('@/assets/help-page/player/leave_tournament_box.jpg')
  ]
},
{
  title: 'Se tidligere spillte partier',
  texts: [
    'For å se en oversikt over dine tidligere spillte parti i turneringen benytter du deg av "Tidligere parti" knappen' +
      ' Denne vil åpne en tabell under som inneholder alle partiene. Benytt samme knappen for å fjerne listen',
    'Om du ikke har spilt noen partier enda, så vil en tabell med teksten "Du har jo ikke spilt enda!" vises'
  ],
  images: [
    require('@/assets/help-page/player/show_past_results.jpg'),
    require('@/assets/help-page/player/past_results.jpg')
  ]
},
{
  title: 'Sjakkur',
  texts: [
    'Om det er ønskelig finnes det også ett sjakkur i applikasjonen. Denne finner man tilgjengelig i hjemmesiden & i' +
      ' turneringssiden til spillerne etter at parti er tildelt.',
    'For å bruke sjakkuret så skal hvit gjøre sitt trekk, så starte tiden ved å trykke på sin knapp. Når tiden' +
      ' går ut er det spillerne selv som har ansvaret for å registrere resultatet.',
    'Spillerne har selv ansvar for å konfigurere klokken ved å sette antall minutter, sekunder pr spiller og hvor' +
      ' mye ekstra tid hver spiller får pr trekk.'
  ],
  images: [
    require('@/assets/help-page/player/show_chess_clock.jpg'),
    require('@/assets/help-page/player/chess_clock.jpg'),
    require('@/assets/help-page/player/chess_clock_config.jpg')
  ]
},
{
  title: 'Pause',
  texts: [
    'Spillere kan selv velge å ta pause fra turneringen, dette gjøres enkelt ved å benytte "pause" kanppen. Dette kan' +
      ' kun gjøres mens spilleren venter på at applikasjonen skal tildele ett nytt parti.',
    ' Når spilleren har tatt pause blir de ikke tildelt nytt parti før de velger å fortsette turneringen igjen.' +
      ' for å fortsette turneringen benytter spilleren knappen som ligger i den samme posisjonen. "forstsett spill".'
  ],
  images: [
    require('@/assets/help-page/player/take_break.jpg'),
    require('@/assets/help-page/player/continue_tournament.jpg')
  ]
},
{
  title: 'Registrering av resultat',
  texts: [
    'Når ett spill er ferdig skal resultatet registreres. Benytt "registrer resultat knappen" Det er ikke nødvendig' +
      ' att begge spillerne legger inn resultat.',
    'Resultat valgene er "Hvit seier", "remi (uavgjort)" eller "sort seier".',
    'Når ene spilleren har lagt inn resultat, så vil motstanderen få en dialog boks der man skal godkjenne eller ikke' +
      ' godkjenne resultatet. Velger man å ikke godkjenne, kan de prøve på nytt eller kontakte turneringsverten for' +
      ' å få oppklaring i uneighetene. Turneringsverten kan også selv velge å overstyre og sette resultatet.'
  ],
  images: [
    require('@/assets/help-page/player/register_result.jpg'),
    require('@/assets/help-page/player/register_result_box.jpg'),
    require('@/assets/help-page/player/validate_result.jpg')

  ]
}
]

export default playerHelpPageData
