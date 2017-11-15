$(document).ready(function() {
    $('.ui.dropdown').dropdown()
    $('.ui.accordion').accordion()
    $('form').form({
        on: 'blur',
        fields: {
            name: {
                identifier: 'itsystem[name]',
                rules: [{
                    type: 'empty',
                    prompt: 'Bitte geben Sie eine Kurzbezeichnung an.'
                }]
            },
             icto: {
                identifier: 'itsystem[icto]',
                rules: [{
                    type: 'regExp',
                    value: 'ICTO-[1-9][0-9]{0,3}',
                    prompt: 'Bitte geben Sie eine gültige ICTO, beginnend mit \"ICTO-" und gefolgt von 1 bis 4 Ziffern, an.'
                }]
            },
            release: {
                identifier: 'itsystem[release]',
                rules: [{
                    type: 'empty',
                    prompt: 'Bitte geben Sie eine Release-Bezeichnung an.'
                }]
            },
            apdex: {
                identifier: 'itsystem[apdexValue]',
                rules: [{
                    type: 'regExp',
                    value: '1.00|0\.[0-9][0-9]\\*{0,1}|0.NS',
                    prompt: 'Bitte geben Sie einen gültigen Apdex-Wert an. Dieser darf \"1.00\", \"0.NS\" oder \"0." gefolgt von 2 Ziffern sein.'
                }]
            }
        }
    });
})
