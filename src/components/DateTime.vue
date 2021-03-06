<template>
  <div class="dateTimeContainer">
  <v-row>
    <v-col>
      <!-- Menu containing the date and time pickers -->
      <v-menu
        ref="menu"
        v-model="menuOpen"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        absolute
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="formattedDateTime"
            label="Dato og tid"
            readonly
            required
            v-on="on"
            data-cy="dateTimeInput"
            :rules="rules !== undefined ? rules : []"
            @click="openDateMenu()"
            @change="onChange"
          >
          </v-text-field>
        </template>

        <!-- Date picker -->
        <v-date-picker
          full-width
          v-if="dateMenu"
          v-model="date"
          :min="minDate"
          :max="maxDate"
        >
          <v-btn text
            color="primary"
            :disabled="date === ''"
            @click="openTimeMenu()"
          >
            OK
          </v-btn>
          <v-btn text
            color="primary"
            @click="dateMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn text
                 color="primary"
                 @click="clearMenu()"
          >
            Clear
          </v-btn>
        </v-date-picker>

        <!-- Time picker -->
        <v-time-picker
          v-if="timeMenu"
          v-model="time"
          format="24hr"
          full-width
          :min="calcMinTime"
          :max="maxTime"
          :color="formColor"
          @click:minute="$refs.menu.save(dateTime)"
          @click="onChange"
          @input="onChange"
        >
        </v-time-picker>
        </v-menu>
    </v-col>
  </v-row>
  </div>
</template>

<script>
export default {
  name: 'DateTime',
  data() {
    return {
      date: '',
      time: '',
      menuOpen: false,
      dateTime: '',
      dateMenu: false,
      timeMenu: false,
      formColor: 'blue'
    }
  },
  props: {
    eventName: { // Name of the event that should be emitted
      type: String,
      default: 'endDateTime'
    },
    rules: { // Rules of the input field. See https://vuetifyjs.com/en/components/text-fields
      type: Array,
      required: false
    },
    minTime: { // The minimum time that can be picked
      type: String,
      default: new Date().getHours().toString() + ':' + (new Date().getMinutes().toString() < 10 ? '0' : '') + new Date().getMinutes().toString(),
      validator: value => {
        return /^(([0-2][0-9])|([\d])):[0-5][\d]$/.test(value) || value.length === 0 // Incase they open endtime before starttime.
      }
    },
    minDate: { // The minimum date that can be picked
      type: String,
      // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd#comment84587622_29774197
      default: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().slice(0, 10),
      validator: value => {
        // regex from https://stackoverflow.com/a/22061879
        return /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value)
      }
    },
    maxTime: { // The highest the clock wil allow
      type: String,
      required: false,
      validator: value => {
        return /^(([0-2][0-5])|([\d])):[0-5][\d]$/.test(value)
      }
    },
    maxDate: { // The furthest calender wil allow
      type: String,
      required: false,
      validator: value => {
        // regex from https://stackoverflow.com/a/22061879
        return /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value)
      }
    }
  },
  methods: {

    /**
     * Open the time menu and close date menu
     */
    openTimeMenu() {
      this.dateMenu = false
      this.timeMenu = true
    },

    /**
     * Open the date menu and close time menu
     */
    openDateMenu() {
      this.dateMenu = true
      this.timeMenu = false
    },

    /**
     * Clears the date and time.
     */
    clearMenu() {
      this.date = ''
      this.time = ''
      this.dateTime = ''
      this.$emit(this.eventName, this.dateTime)
    },

    /**
     * Tells parent component that the date or time has changed.
     */
    onChange() {
      this.dateTime = this.date + 't' + this.time
      this.$emit(this.eventName, this.dateTime)
    }
  },
  computed: {

    /**
     * Formats the date and time
     * @returns {string} Formatted date and time
     */
    formattedDateTime: {
      get() {
        return this.date + '  ' + this.time
      },
      set(newDateTime) {
        return newDateTime
      }
    },

    /**
     * Returns the minimum value the time can be.
     * @returns {string|null} Minimum value the time can be. Null if it can be whatever.
     */
    calcMinTime() {
      let currentDate = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().slice(0, 10)
      if (this.date === currentDate) {
        return this.minTime
      }
      return null
    }
  }
}
</script>

<style scoped>
  .dateTimeContainer{
    width: 100%;
  }
</style>
