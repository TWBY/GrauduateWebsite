// console.log("Partner");

new Vue({
    el: "#app",
    data: function () {
        return {
            //Common
            isMenuOpen: false,
            //Custom
            SponsorsInfo: "",
        }
    },
    created() {
        axios.get('../asset/json/Sponsor.json').then(val => {
            var vm = this;
            vm.SponsorsInfo = val.data;
        })
    },
    methods: {

    }
})