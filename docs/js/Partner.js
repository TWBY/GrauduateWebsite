// console.log("Partner");

new Vue({
    el: "#app",
    data: function () {
        return {
            SponsorsInfo: "",
            // Sponsor: {
            //     Name: "",
            //     Look: "",
            // },
        }
    },
    created() {
        axios.get('../asset/json/Sponsor.json').then(val => {
            var vm = this;
            vm.SponsorsInfo = val.data;
            // this.Sponsor.Name = this.SponsorsInfo[0].Name;
            // this.Sponsor.Look = this.SponsorsInfo[0].Look;
        })
    },
    methods: {

    }
})