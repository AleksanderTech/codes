import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { customProperties: true },
        dark: true,
        themes: {
            dark: {
                primary: '#6300A5',
                error: '#ff2667'
            },
        },
    }
});
