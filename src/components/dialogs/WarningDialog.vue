<template>
  <v-row
    class="justify-center"
    align="center"
  >
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="650px"
    >
      <v-card>
        <v-card-title class="justify-center"> {{ title }}</v-card-title>
        <v-card-text>
          <v-row class="justify-center">
            <h2>Er du sikker på at du vil {{ action }}?</h2>
            <p>Denne handlingen kan <strong>ikke</strong> reverseres.</p>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <!-- User has the option to either leave or go back -->
          <v-btn
            text
            @click="carryOn"
            data-cy="leave"
          >
            {{ carryOnButtonText }}
          </v-btn>
          <v-btn
            text
            color="primary"
            outlined
            @click="closeDialog"
            data-cy="cancel-leave"
          >
            Avbryt
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'WarningDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    showDialog: {
      type: Boolean,
      required: true
    },
    carryOnButtonText: {
      type: String,
      default: 'Fortsett'
    }
  },
  methods: {
    carryOn() {
      this.$emit('carryOn')
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>

</style>
