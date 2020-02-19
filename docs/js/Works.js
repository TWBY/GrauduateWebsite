// console.log("Work");


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


new Vue({
    el: '#app',
    data() {
        return {
            //FullPage setting
            FullPageOptions: {
                autoScrolling: true,
                verticalCentered: false,

                navigation: false,
                showActiveTooltip: false,
                navigationTooltips: ['簡介', '團隊成員', '理念與動機', '製作過程'],
            },

            //Each page show content and close/active bool
            ContentsInfo: "",
            Content: {
                Title: "",
                Detail: "",
            },
            isContentActive: false,
            ButtonBeClick: true,

            //filter data and show the showWorkButton
            Buttons: [],
            SelectedButton: {},
            isTextActive: false,
            selectedCategory: "All",
        }
    },
    created() {
        //Type One (single)
        axios.get('../asset/json/WorkData.json').then(val => {
            console.log("Button.data(single) = ", val.data)
            var vm = this;
            vm.Buttons = val.data.Button;
            vm.SelectedButton = vm.Buttons
            vm.ContentsInfo = val.data.Work;
        })

        //Type One (multiple)
        // axios.all([
        //         axios.get('ButtonData.json'),
        //         axios.get('WorkData.json')
        //     ])
        //     .then(axios.spread(function (Button, Work) {
        //         console.log("Button.data(multiple) = ", Button.data);
        //         var vm = this;
        //         vm.Buttons = Button.data;
        //         vm.SelectedButton = vm.Buttons
        //     }));
    },
    methods: {
        //Each team content show and close
        ShowContent(Index) {
            this.Content.Title = this.ContentsInfo[Index].Title
            this.Content.Detail = this.ContentsInfo[Index].Detail

            this.isContentActive = true
            this.ButtonBeClick = false

            this.FullPageOptions.navigation = true
            this.FullPageOptions.showActiveTooltip = true
        },
        CloseContent() {
            this.isContentActive = false
            this.ButtonBeClick = true

            this.FullPageOptions.navigation = false
            this.FullPageOptions.showActiveTooltip = false
            fullpage_api.moveTo(1, 1)
        },
        //filter the show work button
        ChangeGender(Gender) {
            let vm = this;

            this.isTextActive = true
            setTimeout(() => {
                this.isTextActive = false
            }, 1100)

            setTimeout(() => {
                if (Gender == "All") {
                    vm.SelectedButton = vm.Buttons
                } else {
                    vm.SelectedButton = vm.Buttons.filter(function (person) {
                        return person.Gender === Gender;
                    });
                }
                shuffle(vm.SelectedButton)

            }, 500)
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
                    navLink[i].style.color = "black"
                }
            }
        },
    }
});