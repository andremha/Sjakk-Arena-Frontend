<template>
  <v-row class="justify-center" align="center">
    <v-dialog v-model="dialogBox" persistent max-width="650px">
      <v-card>
        <v-card-title class="justify-center">
          Bestemmer resultat for parti ID:  {{ gameId }}
        </v-card-title>
        <v-card-text>
          <v-row class="justify-center">
            <!-- Radio buttons used to register result; https://vuetifyjs.com/en/components/dialogs -->
            <v-radio-group
              v-model="result"
              :mandatory="true"
              inline-block
            >
              <v-col cols="4">
                <v-radio
                  class="radio"
                  label="Hvit seier"
                  value="1"
                  data-cy="white-win"
                >
                  <v-spacer />
                </v-radio>
              </v-col>
              <v-col cols="4">
                <v-radio
                  class="radio"
                  label="Remis"
                  value="0.5"
                  data-cy="stalemate"
                >
                  <v-spacer />
                </v-radio>
              </v-col>
              <v-col cols="4">
                <v-radio
                  class="radio"
                  label="Sort seier"
                  value="0"
                  data-cy="black-win"
                >
                  <v-spacer />
                </v-radio>
              </v-col>
            </v-radio-group>
          </v-row>
        </v-card-text>
        <v-row class="justify-center">
          <v-alert
            v-if="error"
            type="error"
          >
            {{ errorMessage }}
          </v-alert>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="alterResultDialogState"
            data-cy="cancel"
          >
            Avbryt
          </v-btn>
          <v-btn
            text
            color="primary"
            outlined
            @click="registerResult"
            data-cy="submit"
          >
            Send inn
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ChangeResultDialog',
  props: {
    gameId: {
      type: Number,
      required: true
    },
    dialogBox: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      result: '',
      error: false,
      errorMessage: '',
      selectedFile: null,
      data: null,
      rules: [
        value => !value || value.size < 10000000 || 'Bildet må være mindre enn 10 MB!'
      ]
    }
  },
  methods: {
    ...mapActions([
      'hostSendGameResult'
    ]),

    /**
     * Send the given result to the server.
     */
    registerResult () {
      let param = this.gameId + '/' + this.result
      this.hostSendGameResult(param).then(res => {
        this.alterResultDialogState()
        this.$emit('resultAdded')
      }).catch(err => {
        this.error = true
        if (err.response !== undefined) {
          this.handleErrorResponse(err.response)
        } else {
          this.errorMessage = err.message + 'Prøv igjen senere!'
        }
      })
    },

    /**
     * Alter the state of the visibility state of the result dialog.
     */
    alterResultDialogState() {
      this.error = false
      this.errorMessage = ''
      this.$emit('closeResultDialog')
    },

    /**
     * Display network error to the user.
     * @param response
     */
    handleErrorResponse(response) {
      let status = response.status
      status === 400 ? this.errorMessage = 'http ' + status + ': Spill ikke funnet'
        : this.errorMessage = 'http ' + status + ': Tekniske problem!'
    }
  }
}
</script>

<style scoped>
</style>
