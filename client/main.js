import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import validator from 'validator';

import './main.html';

Template.validator.onCreated(function validatorOnCreated() {
  this.isValid = new ReactiveVar(null);
  this.searchHistory = new ReactiveVar([]);
});

const validate = function(input, option){
  let isValid = validator[option](input);
  return isValid;
};

Template.validator.helpers({
  // counter() {
  //   return Template.instance().counter.get();
  // },
  isValid(){
    return Template.instance().isValid.get();
  },
  searchHistory(){
    return Template.instance().searchHistory.get();
  }

});

Template.validator.events({
  'submit #validate-form'(event, instance) {
    event.preventDefault();

    let input = event.target.input.value
    let option = event.target.option.value;

    let isValid = validate(input,option);
    instance.isValid.set(isValid);

    console.log('new value of isValid',instance.isValid.get());
  },
});
