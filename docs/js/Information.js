// console.log("Information");


new Vue({
    el: "#app",
    data: function () {
        return {
            MapsInfo: "",
            MapInfo: {
                time: "",
                location: "",
                cost: "",
                traffic: "",
                map: "",
            },
            isTextActive: false,
        }
    },
    created() {
        axios.get('../asset/json/MapInfo.json').then(val => {
            var vm = this;
            vm.MapsInfo = val.data;
            this.MapInfo.time = this.MapsInfo[0].time;
            this.MapInfo.location = this.MapsInfo[0].location;
            this.MapInfo.cost = this.MapsInfo[0].cost;
            this.MapInfo.traffic = this.MapsInfo[0].traffic;
            this.MapInfo.map = this.MapsInfo[0].map;
        })
    },
    methods: {
        ChangePeopleInfo(Index) {
            this.isTextActive = true

            setTimeout(() => {
                this.MapInfo.time = this.MapsInfo[Index].time;
                this.MapInfo.location = this.MapsInfo[Index].location;
                this.MapInfo.cost = this.MapsInfo[Index].cost;
                this.MapInfo.traffic = this.MapsInfo[Index].traffic;
                this.MapInfo.map = this.MapsInfo[Index].map;
            }, 500)

            setTimeout(() => {
                this.isTextActive = false
            }, 1100)
        },
        ChangeActiveBarPoa(index) {
            let navbarOuter = document.querySelector('.navbarOuter');
            let activeBar = document.querySelector('.activeBar');
            let navbarOuterWidth = navbarOuter.clientWidth

            transRange = index * (navbarOuterWidth / 3);
            activeBar.style.transform = 'translateX(' + transRange + 'px)';


            let navLink = document.querySelectorAll('.nav-link');
            // console.log(navLink[index])
            for (let i = 0; i < navLink.length; i++) {
                if (i == index) {
                    navLink[i].style.color = "white"
                } else {
                    navLink[i].style.color = "#044EB7"
                }
            }

        }
    }
})