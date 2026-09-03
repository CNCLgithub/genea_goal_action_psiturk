class TrialType {
    static ACTION = "action"
    static GOAL = "goal"
}

class StimulusData {
    constructor(trial_id,
                trial_num,
                trial_type,
                action_init_img_path, action_final_img_path, goal_img_path,
                option_left_img_path, option_right_img_path,
                option_left_detail, option_right_detail,
                action_init_img_src, action_final_img_src, goal_img_src,
                option_left_img_src, option_right_img_src) {
        this.trial_id = trial_id;
        this.trial_num = trial_num;
        this.trial_type = trial_type;

        this.action_init_img_path = action_init_img_path;
        this.action_final_img_path = action_final_img_path;
        this.goal_img_path = goal_img_path;
        this.option_left_img_path = option_left_img_path;
        this.option_right_img_path = option_right_img_path;

        this.option_left_detail = option_left_detail;
        this.option_right_detail = option_right_detail;

        this.action_init_img_src = action_init_img_src;
        this.action_final_img_src = action_final_img_src;
        this.goal_img_src = goal_img_src;
        this.option_left_img_src = option_left_img_src;
        this.option_right_img_src = option_right_img_src;
    }

    get_trial_id(){
        return this.trial_id;
    }

    get_trial_number(){
        return this.trial_num;
    }

    get_trial_type(){
        return this.trial_type;
    }

    get_trial_name() {
        return this.get_trial_type() + "_" + this.get_trial_id();
    }

    get_action_init_img_path(){
        return this.action_init_img_path;
    }

    get_action_final_img_path(){
        return this.action_final_img_path;
    }

    get_goal_img_path(){
        return this.goal_img_path;
    }

    get_option_left_img_path(){
        return this.option_left_img_path;
    }

    get_option_right_img_path(){
        return this.option_right_img_path;
    }

    get_option_left_detail(){
        return this.option_left_detail;
    }

    get_option_right_detail(){
        return this.option_right_detail;
    }

    get_action_init_img_src(){
        return this.action_init_img_src;
    }

    get_action_final_img_src(){
        return this.action_final_img_src;
    }

    get_goal_img_src(){
        return this.goal_img_src;
    }

    get_option_left_img_src(){
        return this.option_left_img_src;
    }

    get_option_right_img_src(){
        return this.option_right_img_src;
    }
}

class TrialData {

    constructor(trial_data) {
        // this.first_part = null;
        this.action_question_prompt = null;
        this.goal_question_prompt = null;
        this.stimulus_list = [];
        this.image_list = [];

        this.#parse_trial_data(trial_data);

        this.current_trial_num = 0;
    }

    #get_preloaded_image(url) {
        if(url != null) {
            let img = new Image();
            img.src = url;
            this.image_list.push(img);
            return this.image_list.at(-1).src;
        }
        return null;
    }

    #parse_trial_data(trial_data) {

        let base_path = "../static/images/";

        // this.first_part = trial_data["first_part"];
        this.action_question_prompt = trial_data["question_prompt_action"];
        this.goal_question_prompt = trial_data["question_prompt_goal"];

        let stimuli_data = trial_data["stimulus"];

        for (let trial_num = 0; trial_num < stimuli_data.length; trial_num++) {
            let stimulus_data = stimuli_data[trial_num];

            let trial_id = null;
            let trial_type = null;
            let action_init_img_path = null;
            let action_final_img_path = null;
            let goal_img_path = null;
            let option_left_img_path = null;
            let option_right_img_path = null;
            let option_left_detail = null;
            let option_right_detail = null;
            if (stimulus_data["trial_type"] === TrialType.ACTION) {
                trial_type = TrialType.ACTION
                goal_img_path = null;
                action_init_img_path = base_path + stimulus_data["trial_init_img"];
                action_final_img_path = base_path + stimulus_data["trial_final_img"];
            } else {
                trial_type = TrialType.GOAL
                goal_img_path = base_path + stimulus_data["trial_init_img"];
                action_init_img_path = null;
                action_final_img_path = null;
            }
            trial_id = stimulus_data["trial_id"];
            option_left_img_path = base_path + stimulus_data["trial_option_left_img"];
            option_right_img_path = base_path + stimulus_data["trial_option_right_img"];
            option_left_detail = stimulus_data["trial_option_left_detail"];
            option_right_detail = stimulus_data["trial_option_right_detail"];

            this.stimulus_list.push(new StimulusData(trial_id,
                                                     trial_num,
                                                     trial_type,
                                                     action_init_img_path, action_final_img_path, goal_img_path,
                                                     option_left_img_path, option_right_img_path,
                                                     option_left_detail, option_right_detail,
                                                     this.#get_preloaded_image(action_init_img_path),
                                                     this.#get_preloaded_image(action_final_img_path),
                                                     this.#get_preloaded_image(goal_img_path),
                                                     this.#get_preloaded_image(option_left_img_path),
                                                     this.#get_preloaded_image(option_right_img_path)));
        }
    }

    #get_current_stimulus_data() {
        return this.stimulus_list[this.current_trial_num];
    }

    update_current_trial_num(current_trial_num) {
        this.current_trial_num = current_trial_num;
    }

    is_action_trial() {
        return this.#get_current_stimulus_data().get_trial_type() === TrialType.ACTION;
    }

    // get_first_part() {
    //     return this.first_part;
    // }

    get_question_prompt() {
        if (this.is_action_trial()) {
            return this.action_question_prompt;
        }
        return this.goal_question_prompt;
    }

    get_trial_number() {
        return this.#get_current_stimulus_data().get_trial_number();
    }

    get_trial_name() {
        return this.#get_current_stimulus_data().get_trial_name();
    }

    get_total_trials() {
        return this.stimulus_list.length;
    }

    get_action_init_img_path() {
        return this.#get_current_stimulus_data().get_action_init_img_path();
    }

    get_action_final_img_path() {
        return this.#get_current_stimulus_data().get_action_final_img_path();
    }

    get_goal_img_path() {
        return this.#get_current_stimulus_data().get_goal_img_path();
    }

    get_option_left_img_path() {
        return this.#get_current_stimulus_data().get_option_left_img_path();
    }

    get_option_right_img_path() {
        return this.#get_current_stimulus_data().get_option_right_img_path();
    }

    get_option_left_detail() {
        return this.#get_current_stimulus_data().get_option_left_detail();
    }

    get_option_right_detail() {
        return this.#get_current_stimulus_data().get_option_right_detail();
    }

    get_action_init_img_src() {
        return this.#get_current_stimulus_data().get_action_init_img_src();
    }

    get_action_final_img_src() {
        return this.#get_current_stimulus_data().get_action_final_img_src();
    }

    get_goal_img_src() {
        return this.#get_current_stimulus_data().get_goal_img_src();
    }

    get_option_left_img_src() {
        return this.#get_current_stimulus_data().get_option_left_img_src();
    }

    get_option_right_img_src() {
        return this.#get_current_stimulus_data().get_option_right_img_src();
    }
}