export default function validate (objInputs) {
    const errors = {};
    if(!objInputs.title){
        errors.title = 'Title is required';
    } else if (objInputs.title.length > 90){
        errors.title = 'Maximum 90 characters';
    }

    if(!objInputs.image){
        errors.image = 'Image is required'
    }

    if(!objInputs.summary){
        errors.summary = 'Summary is required';
    } else if (objInputs.summary.length > 500){
        errors.summary = 'Maximum 500 characters';
    }

    if(objInputs.healthScore < 0){
        errors.healthScore = 'Minimum 0 points';
    } else if (objInputs.healthScore > 100){
        errors.healthScore = 'Maximum 100 points';
    }

    if(!objInputs.process){
        errors.process = 'Process is required';
    }
    return errors;
}