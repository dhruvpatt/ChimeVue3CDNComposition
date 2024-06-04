import SearchBar from "./search-bar.js"
import InfoText from "./info-text.js"
const { ref, computed, onMounted } = Vue;
import emitter from "../event-bus.js"

export default {
    setup(){
        const searched = ref(false);
        const searchItem = ref({});

        const getIcon128 = computed(() => {
            const path = "assets/" + searchItem.value.type + "128.png";
            return path;
        }) 

        const getIcon = computed(() => {
            const path = "assets/" + searchItem.value.type + "128.png";
            return path;
        });

        function handleClick(data){
            searchItem.value = data;
            searched.value = true;
        }

        onMounted(() => {
            emitter.on('resultClicked', (data) => handleClick(data))
        })

        function handleExitButtonClicked(){
            searched.value = false;
            // resizing the upper box to go back to normal size
            const upperDiv = document.getElementsByClassName('upper-box')[0];
            upperDiv.style.height = '20rem';
        }

        return {
            getIcon128,
            getIcon,
            handleClick,
            handleExitButtonClicked,
            searchItem,
            searched
        }

    },

    template: `
        <div class="container">
            <div class="upper-box">
                <search-bar v-if="!searched"></search-bar>
                <div class="search-results-cont" v-if="!searched">
                    <ul id="search-results"></ul>
                </div>


                <div class="searched-container" v-else-if="searched">
                    <div class="title-bubble">
                        <img id="icon" :src="getIcon" />
                        <p class="title-bubble-txt">{{ searchItem.type.toUpperCase() }}</p>
                        <button id="exit-button" @click="handleExitButtonClicked">
                            <img id="exit-button-img" src="assets/cross-23.png" />
                        </button>

                    </div>
                </div>
            </div>

            <div class="info-container" v-if="searched">
                <div class='info-img-container'>
                    <img id='info-img' :src="getIcon128" />
                </div>

                <div class="info-sub-container">
                    <info-text v-for="(item, key, index) in searchItem" :attr="key" :item="item"></info-text>
                </div>
            </div>

        </div>
    `,

    components: {
        SearchBar,
        InfoText
        
    }
}

