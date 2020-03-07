// console.log("Team");

new Vue({
    el: "#app",
    data: function () {
        return {
            TeamsInfo: [],
            TeamInfo: {
                GroupName: "",
                WorkContent: "",
                MemberOne: "",
                MemberTwo: "",
                MemberThree: "",
                MurMur: "",
                MurMurSlogan: "",
                CoverImage: "",
                ContentPicture: ""
            },
            isContentActive: false,
            ButtonBeClick: true
        }
    },
    created() {
        axios.get('../asset/json/Team.json').then(val => {
            var vm = this;
            vm.TeamsInfo = val.data;
        })
    },
    methods: {
        ShowContent(Index) {
            this.TeamInfo.GroupName = this.TeamsInfo[Index].GroupName;
            this.TeamInfo.WorkContent = this.TeamsInfo[Index].WorkContent;

            this.TeamInfo.MemberOne = this.TeamsInfo[Index].MemberOne;
            this.TeamInfo.MemberTwo = this.TeamsInfo[Index].MemberTwo;
            this.TeamInfo.MemberThree = this.TeamsInfo[Index].MemberThree;

            this.TeamInfo.MurMur = this.TeamsInfo[Index].MurMur;
            this.TeamInfo.MurMurSlogan = this.TeamsInfo[Index].MurMurSlogan;
            this.TeamInfo.ContentPicture = this.TeamsInfo[Index].ContentPicture;

            this.isContentActive = true
            this.ButtonBeClick = false

        },
        CloseContent() {
            this.isContentActive = false
            this.ButtonBeClick = true
        }
    }
})