import {
    Template
} from 'meteor/templating';
import {
    ReactiveVar
} from 'meteor/reactive-var';
import validator from 'validator';

import './main.html';

Template.validator.onCreated(function validatorOnCreated() {
    this.isValid = new ReactiveVar(null);
    this.searchHistory = new ReactiveVar([]);
});

const validate = function(input, option) {
    let isValid = validator[option](input);
    return isValid;
};

const addToHistory = function(instance, searchTerm, searchOption, result) {
    let currentHistory = instance.searchHistory.get();
    let length = currentHistory.length;
    let returnObj = {
        searchTerm: searchTerm,
        searchOption: searchOption,
        result: result
    };
    if (length === 5) {
        currentHistory.shift();
        currentHistory.push(returnObj);
    } else {
        currentHistory.push(returnObj);
    }
    instance.searchHistory.set(currentHistory);
};

Template.validator.helpers({
    isValid() {
        return Template.instance().isValid.get();
    },
    searchHistory() {
        return Template.instance().searchHistory.get();
    },
    validResult(){
      return this.result;
    }
});

Template.validator.events({
    'submit #validate-form' (event, instance) {
        event.preventDefault();

        let input = event.target.input.value
        let option = event.target.option.value;

        let isValid = validate(input, option);
        instance.isValid.set(isValid);

        addToHistory(instance, input, option, isValid);
    },
});
