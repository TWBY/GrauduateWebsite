// console.log("Rhapsody");

let dataDetail = {
    labels: ['體重', '易怒', '壓力', '早八準時到', 'Line 未讀'], //change
    datasets: [{
        label: 'Monster Data',
        backgroundColor: 'rgba(255, 226, 0, 0.5)',
        borderColor: 'rgba(255, 226, 0, 0.5)',
        borderWidth: 1,
        data: [5, 5, 5, 2, 4], //change
    }]
}

let optionsDetail = {
    tooltips: {
        enabled: false
    },
    events: [],
    scale: {
        gridLines: {
            color: '#044EB7'
        },
        pointLabels: {
            display: true,
            fontColor: '#044EB7',
            fontSize: 16
        },
        ticks: {
            display: false,
            suggestedMin: 1,
            suggestedMax: 5,
            stepSize: 1,
            fontSize: 20
        }
    }
};


new Vue({
    el: "#app",
    data: function () {
        return {
            monsters: "",
            monster: {
                grade: "",
                EnName: "",
                ChName: "",
                Height: "",
                Weight: "",
                Intro: "",
                Look: "",
                ChartText: [],
                ChartNum: [],
            },
            isTextActive: false,
            dataDetail: dataDetail,
            optionsDetail: optionsDetail,

            isShowTopic: true,
            isShowMonster: false,

            selectIndex: 0
        }
    },
    mounted() {
        this.createChart('myChart');
    },
    created() {
        axios.get('../asset/json/Monster.json').then(val => {
            var vm = this;
            vm.monsters = val.data;
            this.monster.grade = this.monsters[0].grade;
            this.monster.EnName = this.monsters[0].EnName;
            this.monster.ChName = this.monsters[0].ChName;
            this.monster.Height = this.monsters[0].Height;
            this.monster.Weight = this.monsters[0].Weight;
            this.monster.Intro = this.monsters[0].Intro;
            this.monster.Look = this.monsters[0].Look;

            this.monster.ChartText = this.monsters[0].ChartText;
            this.monster.ChartNum = this.monsters[0].ChartNum;
        })
    },
    methods: {
        ChangePeopleInfo(Index) {

            if (this.selectIndex != 0 && Index >= 1 && Index <= 4) {
                this.isTextActive = true;
                setTimeout(() => {
                    this.isTextActive = false
                }, 1100)
            }
            this.selectIndex = Index;

            // this.isTextActive = true;
            // setTimeout(() => {
            //     this.isTextActive = false
            //     this.selectIndex = Index;
            // }, 1100)


            if (Index >= 1) {
                setTimeout(() => {
                    this.isShowMonster = true;
                    this.isShowTopic = false;

                    this.monster.grade = this.monsters[Index - 1].grade;
                    this.monster.EnName = this.monsters[Index - 1].EnName;
                    this.monster.ChName = this.monsters[Index - 1].ChName;
                    this.monster.Height = this.monsters[Index - 1].Height;
                    this.monster.Weight = this.monsters[Index - 1].Weight;
                    this.monster.Intro = this.monsters[Index - 1].Intro;
                    this.monster.Look = this.monsters[Index - 1].Look;

                    for (let i = 0; i < this.monster.ChartText.length; i++) {
                        this.monster.ChartText[i] = this.monsters[Index - 1].ChartText[i];
                        this.monster.ChartNum[i] = this.monsters[Index - 1].ChartNum[i];
                    }

                    for (let j = 0; j < this.monster.ChartText.length; j++) {
                        this.dataDetail.labels[j] = this.monster.ChartText[j]
                        this.dataDetail.datasets[0].data[j] = this.monster.ChartNum[j]
                    }
                }, 500)

                setTimeout(() => {
                    this.createChart('myChart');
                }, 600)

            }

            if (Index == 0) {
                setTimeout(() => {
                    this.isShowMonster = false;
                    this.isShowTopic = true;
                }, 500)
            }


        },
        ChangeActiveBarPoa(index) {
            let navbarOuter = document.querySelector('.navbarOuter');
            let activeBar = document.querySelector('.activeBar');
            let navbarOuterWidth = navbarOuter.clientWidth

            transRange = index * (navbarOuterWidth / 5);
            activeBar.style.transform = 'translateX(' + transRange + 'px)';

            let navLink = document.querySelectorAll('.nav-link');
            console.log(navLink[index])
            for (let i = 0; i < navLink.length; i++) {
                if (i == index) {
                    navLink[i].style.color = "white"
                } else {
                    navLink[i].style.color = "#044EB7"
                }
            }
        },
        createChart(chartId) {
            const ctx = document.getElementById(chartId);
            const myChart = new Chart(ctx, {
                type: 'radar',
                data: this.dataDetail,
                options: this.optionsDetail
            });
            myChart.options.legend.display = false;

        }
    }
})