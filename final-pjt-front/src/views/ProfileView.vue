<template>
  <div>
    <ProfileItem />
    <ProfileMovieList />
  </div>
</template>

<script>
import ProfileItem from '../components/profile/ProfileItem.vue'
import ProfileMovieList from '../components/profile/ProfileMovieList.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ProfileView',
    components: {
        ProfileItem, ProfileMovieList
    },
    computed: {
        ...mapGetters(['profile'])
    },
    methods: {
        ...mapActions(['fetchProfile'])
    },
    created(){
        const payload = {username: this.$route.params.username}
        this.fetchProfile(payload)
    }


}
</script>

<style>

</style>