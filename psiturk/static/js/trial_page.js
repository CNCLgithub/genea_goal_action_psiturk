class TrialPage extends Page {

    constructor(trial_data) {
    // constructor(trial_data, experiment_part) {
        super();
        this.hideAll();

        // this.experiment_part = experiment_part;

        this.trial_data = trial_data;

        this.next_button = document.getElementById("next_trial");

        this.full_screen_element = document.getElementById("full_screen_element");

        this.action_row = document.getElementById("action_inference_row");
        this.goal_row = document.getElementById("goal_inference_row");

        this.goal_image = document.getElementById("goal_inference_img");
        this.action_image_init = document.getElementById("action_inference_init_img");
        this.action_image_final = document.getElementById("action_inference_final_img");

        this.option_image_left = document.getElementById("option_left_img");
        this.option_image_right = document.getElementById("option_right_img");

        this.option_text_left = document.getElementById("left_option_text");
        this.option_text_right = document.getElementById("right_option_text");

        this.question_prompt = document.getElementById("question_prompt");

        this.progress = document.getElementById("progress");
        this.slider = document.getElementById("weightSlider");
        // this.options_radio = document.getElementsByName('options_radio');

        // this.user_selection = 0;
        this.current_trial_num = 0;
        // this.current_display_trial_num = 0;

        this.slider.addEventListener("click", function() {
            toggleButtonToVisible(true);
            // toggleSliderToVisible(true);
        });

        init_slider();
        toggleButtonToVisible(false);
        // toggleSliderToVisible(false);
        // this.#initRadioButton();
        // this.#toggleButtonToVisible(false);
    }

    // #initRadioButton() {
    //     for (let i = 0, len = this.options_radio.length; i< len; i++) {
    //         this.options_radio[i].onclick = function () {
    //             this.#toggleButtonToVisible(true);
    //             this.user_selection = this.options_radio[i].value;
    //         }.bind(this);
    //     }
    // }
    //
    // #toggleButtonToVisible(is_visible) {
    //     if (is_visible) {
    //         this.next_button.style.display = "block";
    //     } else {
    //         this.next_button.style.display = "none";
    //     }
    // }

    // checkTrialNumValidity() {
    //     if (this.experiment_part === 1) {
    //         return this.trial_data.get_trial_name().split("_")[0] === this.trial_data.first_part;
    //     }
    //     return this.trial_data.get_trial_name().split("_")[0] !== this.trial_data.first_part;
    // }

    setCurrentTrialNum(current_trial_num) {
        this.current_trial_num = current_trial_num;
        this.trial_data.update_current_trial_num(this.current_trial_num);
    }

    showPage(callback) {
        this.next_button.onclick = function() {
            console.log("INFO: next button clicked.")
            callback();
        };

        if (this.current_trial_num >= this.trial_data.get_total_trials()) {
            return;
        }

        if (!isFullScreenCurrently()) {
            goFullscreen(this.full_screen_element);
        }

        // this.current_display_trial_num += 1;

        this.#updateText();
        this.#updateImages();
    }

    clearResponse() {
        init_slider();
        // this.#toggleButtonToVisible(false);
        // for (let i = 0, len = this.options_radio.length; i< len; i++) {
        //     this.options_radio[i].checked = false;
        // }
    }

    getSliderValue() {
        return this.slider.value;
    }

    // getUserSelection() {
    //     console.log(this.user_selection);
    //     return this.user_selection;
    // }

    // getCurrentTrialDisplayNum() {
    //     return this.current_display_trial_num;
    // }

    getTrialNumber() {
        return this.trial_data.get_trial_number();
    }

    getTrialName() {
        return this.trial_data.get_trial_name();
    }
    
    getTrialInitImageName() {
        if (this.getTrialName().split("_")[0] === TrialType.ACTION) {
            return this.trial_data.get_action_init_img_path().split("/").at(-1);
        }
        return this.trial_data.get_goal_img_path().split("/").at(-1);
    }

    getTrialFinalImageName() {
        if (this.getTrialName().split("_")[0] === TrialType.ACTION) {
            return this.trial_data.get_action_final_img_path().split("/").at(-1);
        }
        return "";
    }

    getTrialOptionLeftImageName() {
        return this.trial_data.get_option_left_img_path().split("/").at(-1);
    }

    getTrialOptionRightImageName() {
        return this.trial_data.get_option_right_img_path().split("/").at(-1);
    }

    getTrialOptionLeftDetail() {
        return this.trial_data.get_option_left_detail();
    }

    getTrialOptionRightDetail() {
        return this.trial_data.get_option_right_detail();
    }


    /************
     * Helpers  *
     ***********/

    #updateText() {
        this.question_prompt.innerHTML = this.trial_data.get_question_prompt();

        // let true_stimulus_length = 16
        // if (this.experiment_part === 1 && this.trial_data.first_part === "action") {
        //     true_stimulus_length = 20;
        // } else if (this.experiment_part === 2 && this.trial_data.first_part === "goal") {
        //     true_stimulus_length = 20;
        // }
        // this.progress.innerHTML = this.current_display_trial_num + " / " + true_stimulus_length;

        this.progress.innerHTML = (this.trial_data.get_trial_number() + 1) + " / " +
                                  this.trial_data.get_total_trials();

        if (this.trial_data.is_action_trial()) {
            this.question_prompt.innerHTML = this.trial_data.get_question_prompt();
            this.option_text_left.innerText = "Definitely \n this action";
            this.option_text_right.innerText = "Definitely \n this action";
        } else {
            this.option_text_left.innerText = "Definitely \n this goal";
            this.option_text_right.innerText = "Definitely \n this goal";
        }
    }

    #updateImages() {
        let init_loaded = false;
        let final_loaded = false;
        let option_1_loaded = false;
        let option_2_loaded = false;

        function checkCondition() {
            return init_loaded && final_loaded && option_1_loaded && option_2_loaded;
        }

        if (this.trial_data.is_action_trial()) {
            this.goal_row.style.display = "none";
            this.action_row.style.display = "block";
            this.action_image_init.src = this.trial_data.get_action_init_img_src();
            this.action_image_final.src = this.trial_data.get_action_final_img_src();

            this.action_image_init.onload = function () {
                init_loaded = true;
                if (checkCondition) {
                    this.showTrials();
                }
            }.bind(this);
            this.action_image_init.onload = function () {
                final_loaded = true;
                if (checkCondition) {
                    this.showTrials();
                }
            }.bind(this);
        } else {
            final_loaded = true;

            this.action_row.style.display = "none";
            this.goal_row.style.display = "block";
            this.goal_image.src = this.trial_data.get_goal_img_src();
        }
        this.option_image_left.src = this.trial_data.get_option_left_img_src();
        this.option_image_left.onload = function () {
            option_1_loaded = true;
            if (checkCondition) {
                this.showTrials();
            }
        }.bind(this);
        this.option_image_right.src = this.trial_data.get_option_right_img_src();
        this.option_image_right.onload = function () {
            option_2_loaded = true;
            if (checkCondition) {
                this.showTrials();
            }
        }.bind(this);
    }

}
