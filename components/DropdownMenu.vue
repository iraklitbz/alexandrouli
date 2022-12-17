<template>
    <div>
        <button class="appearance-none bg-transparent user-menu-control" aria-controls="user-menu" aria-label="Toggle user menu">
            <div class="w-7 h-7  bg-accent rounded-full flex items-center justify-center">
                <p v-if="letterUser" class="text-white relative userletter">{{ letterUser }}</p>
            </div>

            <svg class="icon w-[12px] h-[12px] ml-1.5 lg:ml-2" aria-hidden="true" viewBox="0 0 12 12">
                <polyline points="1 4 6 9 11 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
        </button>

        <menu id="user-menu" class="menu js-menu">
            <li role="menuitem">
                <nuxt-link to="/usuario/perfil" class="menu__content leading-tight">
                    <span>Profile</span>
                </nuxt-link>
            </li>

            <li class="menu__separator" role="separator"></li>

            <li role="menuitem">
                <a 
                    class="menu__content leading-tight"
                    @click="logout"
                >Logout</a>
            </li>
        </menu>
    </div>
</template>
<script>
import menu from "~/plugins/menu.js";
export default {
    props: {
        user: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            anbani: [
                {
                    a: "ა",
                    b: "ბ",
                    c: "ც",
                    d: "დ",
                    e: "ე",
                    f: "ფ",
                    g: "გ",
                    h: "ჰ",
                    i: "ი",
                    j: "ჯ",
                    k: "ქ",
                    l: "ლ",
                    m: "მ",
                    n: "ნ",
                    o: "ო",
                    p: "პ",
                    q: "ქ",
                    r: "რ",
                    s: "ს",
                    t: "თ",
                    u: "უ",
                    v: "ვ",
                    w: "ვ",
                    x: "წ",
                    y: "ი",
                    z: "ზ"      
                }
            ],
            letterUser: null
        }
    },
  mounted() {
    menu();
    this.anbani.forEach((item) => {
        if (item[this.user.email.charAt(0).toLowerCase()]) {
            this.letterUser = item[this.user.email.charAt(0).toLowerCase()]
        }
    })
    this.user.email.charAt(0).toLowerCase();
  },
  methods: {
    logout() {
        this.$fire.auth.signOut()
    }
  }
}
</script>
<style lang="scss">
  @import "~/assets/scss/_menu.scss";
  .userletter {
    top: -1px;
  }
</style>