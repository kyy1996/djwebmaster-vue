<template>
  <v-toolbar
    id="core-toolbar"
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-regular"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>menu</v-icon>
        </v-btn>
        {{ pageTitle }}
      </v-toolbar-title>
    </div>

    <v-spacer/>
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-button
          v-ripple
          class="toolbar-items"
          to="/"
          nuxt
          icon
        >
          <v-icon color="tertiary">dashboard</v-icon>
        </v-button>
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
          <v-button
            type="button"
            slot="activator"
            v-ripple
            class="toolbar-items"
            icon
          >
            <v-icon color="tertiary">person</v-icon>
          </v-button>
          <v-list>
            <v-list-tile
              to="/user/user/my"
              replace
              nuxt
            >
              <v-list-tile-title>个人资料</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              @click="logout"
            >
              <v-list-tile-title>注销</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import { directives, VBtn } from 'vuetify/lib';

  const { mapMutations } = createNamespacedHelpers('layout');
  const { mapState } = createNamespacedHelpers('menu');
  const VRipple = directives.Ripple;
  const VButton = VBtn;

  export default {
    directives: { VRipple },
    components: { VButton },
    data: () => ({
      notifications: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ],
      responsive: false,
      responsiveInput: false
    }),

    computed: {
      ...mapState(['pageTitle'])
    },

    mounted () {
      this.onResponsiveInverted();
      window.addEventListener('resize', this.onResponsiveInverted);
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted);
    },

    methods: {
      ...mapMutations(['setDrawer', 'toggleDrawer']),
      onClickBtn () {
        this.setDrawer(!this.$store.state.layout.drawer);
      },
      onClick () {
        //
      },
      onResponsiveInverted () {
        if (window.innerWidth < 991) {
          this.responsive = true;
          this.responsiveInput = false;
        } else {
          this.responsive = false;
          this.responsiveInput = true;
        }
      },
      logout () {
        this.$axios.post('/ajax/common/auth/logout').finally(() => {
          this.$router.push('/');
        });
      }
    }
  };
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
