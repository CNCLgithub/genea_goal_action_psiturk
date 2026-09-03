let init_instructions = [
    [
        "Thank you for volunteering to help out with our study.<br>" +
        "<ul>" +
        "<li>Please take a moment to adjust your seating so that you can comfortably watch the monitor and use the keyboard/mouse." +
        "<li>Close the door or do whatever is necessary to minimize disturbance during the experiment." +
        "<li>Please also take a moment to silence your phone so that you are not interrupted by any messages mid-experiment." +
        "</ul><br>" +
        "Click <b>Next</b> when you are ready to continue.",
        "left", "", false, 8
    ],
    [
        "This experiment requires you to be in <b>full screen</b> mode.<br><br>" +
        "We will switch you to full screen mode when you press <b>Next</b> below.<br><br>" +
        "Don't worry, we will return back to the normal size at the end of the experiment.<br><br>" + "" +
        "Please Note: If you do need to leave in the middle, you can press the ESC key -- but please avoid this. Your responses are only useful to us if you stay in this mode until the end of the experiment.<br><br>"+
        "Click <b>Next</b> to continue.",
        "left"
    ],
    [
        "The study is designed to be <i>challenging</i>.<br> " +
        "Sometimes, you'll be certain about what you saw. Other times, you won't be -- that is okay! We only hope that you give your best shot at all the questions in the experiment.",
        "center"
    ],
    [
        "We know it is difficult to stay focused on the screen for too long, but we urge you to do your best.<br><br>" +
        "Thank you again for your participation in this study and for your help with our research!<br>",
        "center"
    ],
    [
        "In this experiment, you will be presented with images containing <b>FIVE</b> blocks arranaged in different configurations. " +
        "In some of these images, you'll also see my hands manipulating the arrangement of the blocks.<br><br>" +
        "For instance, below is an example of me reorganizing the blocks to attain the goal arrangement <br> illustrated in the <b>final configuration</b> image. <br>",
        "center"
    ],
    [
        "Overall, your task will be to predict the intention behind my actions. <br><br>" +
        "There are <b>TWO</b> types of questions that you will be asked: <br><br>" +
        "<ol>" +
        "<li><b>What was the goal? </b>: <br>" +
        "Here, you'll be presented with THREE images -- an image demonstrating my intented action, and two images displaying two potential outcomes of my action on either sides of a slider.<br><br>" +
        "<li><b>What was my next action? </b>: <br>"+
        "Here, you'll be presented with FOUR images -- an image displaying some initial configuration that the blocks were in, an image displaying a final configuration that the blocks were moved to, and two images on either sides of a slider that illustrate two potential actions I could perform to go from the initial to the final configuration. " +
        "</ol><br>" +
        "<i>Please use the slider to report your judgement in the experiment.</i>",
        "left"
    ],
    [
        "To ensure that you have understood the instructions well, we will ask you two questions relating to what you read. <br><br>" +
        "Click <b>Next</b> to proceed to a short quiz.",
        "center"
    ],
];


class InstructionPage extends Page {

    // constructor(experiment_part, first_part) {
    constructor() {
        super();
        this.showInstructions();

        // this.experiment_part = experiment_part;
        // this.first_part = first_part;

        this.full_screen_element = document.getElementById("full_screen_element");
        this.instructions = document.getElementById("instructions");
        this.next_button = document.getElementById("next_instruction");

        this.instructions_img_div = document.getElementById("instructions_img_div");
        this.instructions_img = document.getElementById("instructions_img");

        this.instruction_number = 0;

        // this.first_instruction_set = [...init_instructions, ...goal_part_1_instructions]
        // this.second_instructions_set = [...action_part_2_instructions]
        // if (this.first_part === "action") {
        //     this.first_instruction_set = [...init_instructions, ...action_part_1_instructions]
        //     this.second_instructions_set = [...goal_part_2_instructions]
        // }
    }

    set_instruction_number(instruction_number) {
        this.instruction_number = instruction_number;
    }

    get_total_instructions() {
        return init_instructions.length;
        // if (this.experiment_part === 2) {
        //     return this.second_instructions_set.length;
        // }
        // return this.first_instruction_set.length;
    }

    showNextInstruction(callback) {
        this.next_button.onclick = function() {
            console.log("INFO: next button clicked.");
            callback();
        };

        if (this.instruction_number >= this.get_total_instructions()) {
            console.log("No more instructions to process.");
            return;
        }

        let instruction_array = init_instructions.slice();
        // let instruction_array = this.first_instruction_set.slice();
        // if (this.experiment_part === 2) {
        //     instruction_array = this.second_instructions_set.slice();
        // }

        if (this.instruction_number > 1 && !isFullScreenCurrently()) {
            goFullscreen(this.full_screen_element);
        }

        this.instructions_img_div.style.display = "none";

        let base_path = "../static/images/";
        if (this.instruction_number === 4) {
            this.instructions_img.src = base_path + "instructions_action_no_arrow.png";
            this.instructions_img.onload = function () {
                this.showInstructions();
            }.bind(this);

            this.instructions_img_div.style.display = "block";
        }

        this.instructions.innerHTML = instruction_array[this.instruction_number][0];
        this.instructions.style.textAlign = instruction_array[this.instruction_number][1];
    }

}
