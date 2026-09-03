import os
import random
import json
from time import gmtime, strftime


PSITURK_PATH = os.path.dirname(os.path.realpath(__file__))
STIMULUS_DIR = os.path.join(PSITURK_PATH, "static/images")
JSON_DATA_DIR = os.path.join(PSITURK_PATH, "static/data")

ALPHABETS = "abcdefghijklmnopqrstuvwxyz"


class Hands:
    ONE_HAND = "one_hand"
    OTHER_HAND = "other_hand_left_most_block"
    TWO_HANDS = "two_hands"

    GOAL_EXPECTED = "expected"
    GOAL_OTHER = "other"

    ACTION_A1_LEFT = ONE_HAND
    ACTION_A1_RIGHT = TWO_HANDS
    ACTION_A2_LEFT = TWO_HANDS
    ACTION_A2_RIGHT = ONE_HAND

    ACTION_B1_LEFT = ONE_HAND
    ACTION_B1_RIGHT = TWO_HANDS
    ACTION_B2_LEFT = TWO_HANDS
    ACTION_B2_RIGHT = ONE_HAND

    ACTION_C1_LEFT = TWO_HANDS
    ACTION_C1_RIGHT = ONE_HAND
    ACTION_C2_LEFT = ONE_HAND
    ACTION_C2_RIGHT = TWO_HANDS

    ACTION_D1_LEFT = ONE_HAND
    ACTION_D1_RIGHT = TWO_HANDS
    ACTION_D2_LEFT = TWO_HANDS
    ACTION_D2_RIGHT = ONE_HAND

    ACTION_E1_LEFT = ONE_HAND
    ACTION_E1_RIGHT = TWO_HANDS
    ACTION_E2_LEFT = TWO_HANDS
    ACTION_E2_RIGHT = ONE_HAND

    ACTION_F1_LEFT = ONE_HAND
    ACTION_F1_RIGHT = TWO_HANDS
    ACTION_F2_LEFT = TWO_HANDS
    ACTION_F2_RIGHT = ONE_HAND
    ACTION_F3_LEFT = ONE_HAND
    ACTION_F3_RIGHT = TWO_HANDS

    ACTION_G1_LEFT = TWO_HANDS
    ACTION_G1_RIGHT = ONE_HAND
    ACTION_G2_LEFT = ONE_HAND
    ACTION_G2_RIGHT = TWO_HANDS
    ACTION_G3_LEFT = TWO_HANDS
    ACTION_G3_RIGHT = ONE_HAND

    ACTION_H1_LEFT = TWO_HANDS
    ACTION_H1_RIGHT = ONE_HAND
    ACTION_H2_LEFT = ONE_HAND
    ACTION_H2_RIGHT = TWO_HANDS

    ACTION_I1_LEFT = OTHER_HAND
    ACTION_I1_RIGHT = ONE_HAND
    ACTION_I2_LEFT = ONE_HAND
    ACTION_I2_RIGHT = OTHER_HAND

    GOAL_A1_LEFT = GOAL_OTHER
    GOAL_A1_RIGHT = GOAL_EXPECTED
    GOAL_A2_LEFT = GOAL_EXPECTED
    GOAL_A2_RIGHT = GOAL_OTHER

    GOAL_B1_LEFT = GOAL_EXPECTED
    GOAL_B1_RIGHT = GOAL_EXPECTED
    GOAL_B2_LEFT = GOAL_EXPECTED
    GOAL_B2_RIGHT = GOAL_EXPECTED

    GOAL_C1_LEFT = GOAL_OTHER
    GOAL_C1_RIGHT = GOAL_EXPECTED
    GOAL_C2_LEFT = GOAL_EXPECTED
    GOAL_C2_RIGHT = GOAL_OTHER

    GOAL_D1_LEFT = GOAL_EXPECTED
    GOAL_D1_RIGHT = GOAL_OTHER
    GOAL_D2_LEFT = GOAL_OTHER
    GOAL_D2_RIGHT = GOAL_EXPECTED

    GOAL_E1_LEFT = GOAL_EXPECTED
    GOAL_E1_RIGHT = GOAL_OTHER
    GOAL_E2_LEFT = GOAL_OTHER
    GOAL_E2_RIGHT = GOAL_EXPECTED

    GOAL_F1_LEFT = GOAL_EXPECTED
    GOAL_F1_RIGHT = GOAL_EXPECTED
    GOAL_F2_LEFT = GOAL_EXPECTED
    GOAL_F2_RIGHT = GOAL_EXPECTED

    GOAL_G1_LEFT = GOAL_EXPECTED
    GOAL_G1_RIGHT = GOAL_OTHER
    GOAL_G2_LEFT = GOAL_OTHER
    GOAL_G2_RIGHT = GOAL_EXPECTED

    GOAL_H1_LEFT = GOAL_EXPECTED
    GOAL_H1_RIGHT = GOAL_OTHER
    GOAL_H2_LEFT = GOAL_OTHER
    GOAL_H2_RIGHT = GOAL_EXPECTED


class JsonWriter:
    # GOAL = "goal"
    # ACTION = "action"

    STIMULUS = "stimulus"
    QUESTION_ACTION_PROMPT = "question_prompt_action"
    QUESTION_GOAL_PROMPT = "question_prompt_goal"
    # FIRST_PART = "first_part"

    QUESTION_ACTION = "What was my next <b>action</b>?"
    QUESTION_GOAL = "What was the <b>goal</b>?"

    TRIAL_ID = "trial_id"
    TRIAL_TYPE = "trial_type"
    TRIAL_INIT_IMG = "trial_init_img"
    TRIAL_FINAL_IMG = "trial_final_img"
    TRIAL_OPT_LEFT_IMG = "trial_option_left_img"
    TRIAL_OPT_RIGHT_IMG = "trial_option_right_img"
    TRIAL_OPT_LEFT_DETAIL = "trial_option_left_detail"
    TRIAL_OPT_RIGHT_DETAIL = "trial_option_right_detail"

    def __init__(self, stimulus_list):
        self.json_object = self._get_stimulus_list_dict(stimulus_list)

    def _get_stimulus_dict(self,
                           trial_id, trial_type,
                           init_img, final_img,
                           opt_left_img, opt_right_img, opt_left_detail, opt_right_detail):
        returned_dict = dict()
        returned_dict[self.TRIAL_ID] = trial_id
        returned_dict[self.TRIAL_TYPE] = trial_type
        returned_dict[self.TRIAL_INIT_IMG] = init_img
        returned_dict[self.TRIAL_FINAL_IMG] = final_img
        returned_dict[self.TRIAL_OPT_LEFT_IMG] = opt_left_img
        returned_dict[self.TRIAL_OPT_RIGHT_IMG] = opt_right_img
        returned_dict[self.TRIAL_OPT_LEFT_DETAIL] = opt_left_detail
        returned_dict[self.TRIAL_OPT_RIGHT_DETAIL] = opt_right_detail
        return returned_dict

    def _get_stimulus_list_dict(self, stimulus_list):
        returned_dict = dict()

        # first_part_choices = [self.ACTION, self.GOAL]
        # first_part_index = random.choice([0, 1])

        array = []
        for stimulus in stimulus_list:
            array.append(self._get_stimulus_dict(stimulus.get_stimulus_id(),
                                                 stimulus.get_stimulus_type(),
                                                 stimulus.get_init_img(),
                                                 stimulus.get_final_img(),
                                                 stimulus.get_option_1_img(),
                                                 stimulus.get_option_2_img(),
                                                 stimulus.get_option_1_detail(),
                                                 stimulus.get_option_2_detail()))

        # returned_dict[self.FIRST_PART] = first_part_choices[first_part_index]
        returned_dict[self.QUESTION_ACTION_PROMPT] = self.QUESTION_ACTION
        returned_dict[self.QUESTION_GOAL_PROMPT] = self.QUESTION_GOAL
        returned_dict[self.STIMULUS] = array
        return returned_dict

    def get_json_string(self):
        return json.dumps(self.json_object, indent=2)


class Stimulus:
    def __init__(self, stimulus_id, stimulus_type):
        self.stimulus_id = stimulus_id
        self.stimulus_type = stimulus_type
        self.init_img = None
        self.final_img = None
        self.option_1_img = None
        self.option_2_img = None
        self.option_1_detail = None
        self.option_2_detail = None

    def set_init_img(self, img):
        self.init_img = img

    def set_final_img(self, img):
        self.final_img = img

    def set_option_1_img(self, img):
        self.option_1_img = img

    def set_option_2_img(self, img):
        self.option_2_img = img

    def set_option_1_detail(self, stimulus_index):
        key = (self.stimulus_type + "_" + self.stimulus_id + str(stimulus_index) + "_" + "left").upper()
        self.option_1_detail = Hands.__dict__[key.upper()]

    def set_option_2_detail(self, stimulus_index):
        key = (self.stimulus_type + "_" + self.stimulus_id + str(stimulus_index) + "_" + "right").upper()
        self.option_2_detail = Hands.__dict__[key.upper()]

    def get_stimulus_id(self):
        return self.stimulus_id

    def get_stimulus_type(self):
        return self.stimulus_type

    def get_init_img(self):
        return self.init_img

    def get_final_img(self):
        return self.final_img

    def get_option_1_img(self):
        return self.option_1_img

    def get_option_2_img(self):
        return self.option_2_img

    def get_option_1_detail(self):
        return self.option_1_detail

    def get_option_2_detail(self):
        return self.option_2_detail


class TrialType:
    ACTION = "action"
    GOAL = "goal"


class Trial:
    def __init__(self, trial_id, trial_type):
        self.trial_id = trial_id
        self.trial_type = trial_type

        self.stimulus_set_1 = None
        self.stimulus_set_2 = None
        self.stimulus_set_3 = None

    def set_stimulus_set_1(self, stimulus):
        self.stimulus_set_1 = stimulus

    def set_stimulus_set_2(self, stimulus):
        self.stimulus_set_2 = stimulus

    def set_stimulus_set_3(self, stimulus):
        self.stimulus_set_3 = stimulus

    def get_trial_type(self):
        return self.trial_type

    def get_trial_id(self):
        return self.trial_id

    def check_condition(self, stimulus_num):
        if stimulus_num == 1:
            return self.stimulus_set_1 is None
        if stimulus_num == 2:
            return self.stimulus_set_2 is None
        return self.stimulus_set_3 is None

    def return_stimulus_set(self):
        stimulus_num = random.randint(1, 3)
        while self.check_condition(stimulus_num):
            stimulus_num = random.randint(1, 3)

        if stimulus_num == 1:
            returned_stimulus = self.stimulus_set_1
            self.stimulus_set_1 = None
            return returned_stimulus
        if stimulus_num == 2:
            returned_stimulus = self.stimulus_set_2
            self.stimulus_set_2 = None
            return returned_stimulus
        returned_stimulus = self.stimulus_set_3
        self.stimulus_set_3 = None
        return returned_stimulus


def get_stimulus_files():
    all_filenames = []
    for file in os.listdir(STIMULUS_DIR):
        if file.startswith(TrialType.ACTION) or file.startswith(TrialType.GOAL):
            all_filenames.append(file)
    return sorted(all_filenames)


def get_all_trials(stimulus_files):

    all_trials = []

    def find_trial_images(t_id, t_type):
        return [f for f in stimulus_files if f.startswith(t_type + "_" + t_id)]

    def get_trial(t_id, t_type):
        img_files = find_trial_images(t_id, t_type)
        if len(img_files) == 0:
            return None

        t = Trial(t_id, t_type)
        s1 = Stimulus(t_id, t_type)
        s2 = Stimulus(t_id, t_type)
        s3 = None

        for file in img_files:
            split_filename = file.split(".")[0].split("_")
            stimulus_set_num = int(split_filename[1][1:])

            s = s1
            if stimulus_set_num == 2:
                s = s2
            if stimulus_set_num == 3:
                if s3 is None:
                    s3 = Stimulus(t_id, t_type)
                s = s3

            if len(split_filename) == 2:
                s.set_init_img(file)
            elif split_filename[2] == "f":
                s.set_final_img(file)
            elif split_filename[2] == "opt" and split_filename[3] == "1":
                s.set_option_1_img(file)
            elif split_filename[2] == "opt" and split_filename[3] == "2":
                s.set_option_2_img(file)

            s.set_option_1_detail(stimulus_set_num)
            s.set_option_2_detail(stimulus_set_num)

        t.set_stimulus_set_1(s1)
        t.set_stimulus_set_2(s2)
        t.set_stimulus_set_3(s3)
        return t

    possible_trial_ids = list(ALPHABETS)

    for trial_id in possible_trial_ids:
        trial_action = get_trial(trial_id, TrialType.ACTION)
        if trial_action is not None:
            all_trials.append(trial_action)

        trial_goal = get_trial(trial_id, TrialType.GOAL)
        if trial_goal is not None:
            all_trials.append(trial_goal)

    return all_trials


def get_trial_order(all_trials):
    total_action_ids = int(len([f for f in all_trials if (f.get_trial_type() == TrialType.ACTION)]))
    total_goal_ids = int(len([f for f in all_trials if (f.get_trial_type() == TrialType.GOAL)]))

    possible_action_ids = list(ALPHABETS[:int(total_action_ids)]) * 2
    possible_goal_ids = list(ALPHABETS[:int(total_goal_ids)]) * 2

    possible_action_ids.extend(['g', 'f'])  # HAVE A 3rd STIMULUS SET

    possible_action_ids = ["a" + i for i in possible_action_ids]
    possible_goal_ids = ["g" + i for i in possible_goal_ids]

    def get_trial_object(trial_name):
        for i in all_trials:
            if i.get_trial_type()[0] + i.get_trial_id() == trial_name:
                return i.return_stimulus_set()
        return None

    def draw_random_char(total_unique_characters):
        random_index = random.randrange(0, total_unique_characters)
        return random_index, list(ALPHABETS)[random_index]

    def check_condition(sample_trial_type, sample_char, trial_prev, trial_prev_prev,
                        action_frequencies, goal_frequencies):
        condition1 = sample_char == trial_prev[1]
        condition2 = sample_char == trial_prev_prev[1]
        condition3 = sample_trial_type == trial_prev[0]
        condition4 = sample_trial_type == trial_prev_prev[0]
        condition5 = action_frequencies[ALPHABETS.index(sample_char)] == 0 if sample_trial_type == "a" \
            else goal_frequencies[ALPHABETS.index(sample_char)] == 0

        condition6 = False
        condition7 = False
        condition8 = False
        condition9 = False
        if trial_prev[1] in ALPHABETS:
            condition6 = sample_char == ALPHABETS[ALPHABETS.index(trial_prev[1]) - 1]
            condition7 = sample_char == ALPHABETS[ALPHABETS.index(trial_prev[1]) + 1]
            condition8 = sample_char == ALPHABETS[ALPHABETS.index(trial_prev[1]) - 2]
            condition9 = sample_char == ALPHABETS[ALPHABETS.index(trial_prev[1]) + 2]

        base_conditions = condition1 or condition2 or condition6 or condition7 or condition8 or condition9
        return (base_conditions or (condition3 and condition4)) or condition5

    def generate_random_array(trials_list):
        total_trials = len(trials_list)
        total_action_unique_characters = 0
        total_goal_unique_characters = 0

        action_frequencies = [0] * len(list(ALPHABETS))
        goal_frequencies = [0] * len(list(ALPHABETS))

        for i in range(total_trials):
            current_trial = trials_list[i][0]
            index = ALPHABETS.index(trials_list[i][1])

            if current_trial == 'a':
                if action_frequencies[index] == 0:
                    total_action_unique_characters += 1
                action_frequencies[index] += 1
            elif current_trial == 'g':
                if goal_frequencies[index] == 0:
                    total_goal_unique_characters += 1
                goal_frequencies[index] += 1

        return_value = []
        trial_prev = "__"
        trial_prev_prev = "__"
        # all_trial_types_arr = "a" * 20 + "g" * 16
        for _ in range(total_trials):
            tries = 0
            sample_trial_type = "a" if random.randint(0, 1) else "g"
            # sample_trial_type = all_trial_types_arr[p]

            sample_index, sample_char = draw_random_char(total_action_unique_characters)
            while check_condition(sample_trial_type, sample_char, trial_prev, trial_prev_prev,
                                  action_frequencies, goal_frequencies):
                tries += 1
                sample_trial_type = "a" if random.randint(0, 1) else "g"
                sample_index, sample_char = draw_random_char(total_action_unique_characters)
                if tries > 100:
                    return None

            trial_prev_prev = trial_prev
            trial_prev = sample_trial_type + sample_char

            if sample_trial_type == "a":
                action_frequencies[ALPHABETS.index(sample_char)] -= 1
            elif sample_trial_type == "g":
                goal_frequencies[ALPHABETS.index(sample_char)] -= 1

            return_value.append(sample_trial_type + sample_char)
        return return_value

    final_trial_list = generate_random_array(possible_action_ids + possible_goal_ids)
    while final_trial_list is None:
        final_trial_list = generate_random_array(possible_action_ids + possible_goal_ids)

    return_stimulus_list = []
    for i in final_trial_list:
        return_stimulus_list.append(get_trial_object(i))

    return return_stimulus_list


def generate_json_condition_file(stimulus_list):
    json_string = JsonWriter(stimulus_list).get_json_string()

    with open(os.path.join(JSON_DATA_DIR, 'condition_list.json'), 'w') as outfile:
        outfile.write(json_string)
        outfile.close()

    curr_time = strftime("_%m_%d_T_%H_%M_%S", gmtime())
    with open(os.path.join(JSON_DATA_DIR, 'condition_list' + curr_time + '.json'), 'w') as outfile:
        outfile.write(json_string)
        outfile.close()


def main():
    stimulus_files = get_stimulus_files()
    all_trials = get_trial_order(get_all_trials(stimulus_files))
    generate_json_condition_file(all_trials)


if __name__ == '__main__':
    main()
