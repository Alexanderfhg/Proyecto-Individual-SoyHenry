export default function validate (objInputs) {
    const errors = {};
    if(!objInputs.title){
        errors.title = 'The title is required';
    } else if (objInputs.title.length > 90){
        errors.title = 'Max 90 characters';
    }
    if(!objInputs.summary){
        errors.summary = 'The summary is required';
    } else if (objInputs.summary.length > 500){
        errors.summary = 'Max 500 characters';
    }
    if(objInputs.healthScore < 0){
        errors.healthScore = 'Min 0';
    } else if (objInputs.healthScore > 100){
        errors.healthScore = 'Max 100';
    }
    if(!objInputs.process){
        errors.process = 'The process is required';
    }
    return errors;
}