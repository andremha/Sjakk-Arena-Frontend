<template>
  <div id="helpRoot">
    <!-- Navigation bar -->
  <v-tabs
    v-model="tab"
    color="#910002"
    grow
      >
    <!-- Items in navigation bar -->
        <v-tab
          v-for="item in items"
          :key="item"
          :data-cy="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

    <!-- Content for each of the navigation items -->
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <HelpPanels
            class="hostPanels"
            :data="hostHelpPageData"
          />
        </v-tab-item>

        <v-tab-item>
          <HelpPanels
            class="hostPanels"
            :data="playerHelpPageData"
          />
        </v-tab-item>

        <v-tab-item>
          <NotificationHelp v-if="browserHasNotifications"/>
          <div v-else-if="!browserHasNotifications">
          <h1 class="not-supported">
            Beklager! Din enhet eller nettleser støtter ikke push-varsler
          </h1>
          <h3>
            Om du mener dette er feil, kontakt system ansvarlig
          </h3>
          </div>
        </v-tab-item>
      </v-tabs-items>
  </div>
</template>

<script>
import NotificationHelp from '@/components/helppage/NotificationHelp'
import HelpPanels from '@/components/helppage/HelpPanels'
import hostHelpPageData from '@/data/hostHelpPage'
import playerHelpPageData from '@/data/playerHelpPage'

export default {
  name: 'Help',
  components: { NotificationHelp, HelpPanels },
  data () {
    return {
      tab: null,
      items: [
        'Vert', 'Spiller', 'Notifikasjoner'
      ],
      browserHasNotifications: 'PushManager' in window && 'Notification' in window && 'serviceWorker' in navigator,
      hostHelpPageData: hostHelpPageData,
      playerHelpPageData: playerHelpPageData
    }
  }
}
</script>

<style scoped>
  .not-supported{
    color: red
  }
  #helpRoot{
    text-align: center;
  }
  .hostPanels{
    max-width: 85%;
    margin: 2% auto auto auto;
  }
</style>
