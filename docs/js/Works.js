if (screen && screen.width > 1200) {
    document.write('<script src="https://unpkg.com/vue-fullpage.js/dist/vue-fullpage.min.js"><\/script>');
}

console.log("screen.width = " + screen.width);
console.log("screen = " + screen);

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
            //Common
            isMenuOpen: false,
            //Custom
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
                Tag: "",
                Category: "",
                Logo: "",
                Intro: "",
                Member: []
            },
            isContentActive: false,
            ButtonBeClick: true,
            selectIndex: 0,

            //filter data and show the showWorkButton
            Buttons: [],
            SelectedButton: [],
            isTextActive: false,
            selectedCategory: "All",

            //style setting
            MemberWidth: "20%",
            MemberMaxWidth: "60%"
        }
    },
    created() {
        // multiple
        axios.all([
                axios.get('../asset/json/ProjectButton.json'),
                axios.get('../asset/json/Project.json')
            ])
            .then(axios.spread((buttons, work) => {
                this.Buttons = buttons.data;
                this.SelectedButton = this.Buttons;
                shuffle(this.SelectedButton)
                this.ContentsInfo = work.data;
            }))
    },
    methods: {
        //Each team content show and close
        ShowContent(Index) {
            this.Content.Title = this.ContentsInfo[Index].Title
            this.Content.Tag = this.ContentsInfo[Index].Tag
            this.Content.Category = this.ContentsInfo[Index].Category
            this.Content.Logo = this.ContentsInfo[Index].Logo
            this.Content.Intro = this.ContentsInfo[Index].Intro
            this.Content.Member = this.ContentsInfo[Index].Member


            this.isContentActive = true
            this.ButtonBeClick = false

            this.FullPageOptions.navigation = true
            this.FullPageOptions.showActiveTooltip = true


            setTimeout(() => {
                let MemLength = this.Content.Member.length;

                if (MemLength <= 6) {
                    this.MemberWidth = "33%";
                    this.MemberMaxWidth = "60%"

                } else if (MemLength == 6 || MemLength == 7) {
                    this.MemberWidth = "25%"
                    this.MemberMaxWidth = "100%"
                } else {
                    this.MemberWidth = "20%"
                    this.MemberMaxWidth = "70%"
                }
            }, 100)

        },
        CloseContent() {
            this.isContentActive = false
            this.ButtonBeClick = true

            this.FullPageOptions.navigation = false
            this.FullPageOptions.showActiveTooltip = false
            fullpage_api.moveTo(1, 1)
        },
        //filter the show work button
        ChangeTag(Category, Index) {

            if (this.selectIndex != Index) {
                this.selectIndex = Index;

                let vm = this;
                this.isTextActive = true

                setTimeout(() => {
                    this.isTextActive = false
                }, 1100)

                setTimeout(() => {

                    if (Category == "All") {
                        vm.SelectedButton = vm.Buttons
                    } else {
                        vm.SelectedButton = vm.Buttons.filter(function (project) {
                            return project.Category === Category;
                        });
                    }
                    shuffle(vm.SelectedButton)

                }, 500)
            }
        },
        ChangeActiveBarPoa(index) {
            let navbarOuter = document.querySelector('.navbarOuter');
            let activeBar = document.querySelector('.activeBar');
            let navItem = document.getElementsByClassName("nav-item");
            let navbarOuterWidth = navbarOuter.clientWidth

            transRange = index * (navbarOuterWidth / navItem.length);
            activeBar.style.transform = 'translateX(' + transRange + 'px)';

            let navLink = document.querySelectorAll('.nav-link');

            for (let i = 0; i < navLink.length; i++) {
                if (i == index) {
                    navLink[i].style.color = "white"
                } else {
                    navLink[i].style.color = "rgb(4, 78, 183)";
                }
            }
        },
    }
});