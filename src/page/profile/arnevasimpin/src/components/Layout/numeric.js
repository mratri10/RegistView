function numeric(model, value){
    var nilai;
    switch (model) {
        case 'money':
            switch (value.toString().length) {
                case 0:
                    nilai = value
                    break;
                case 1:
                    nilai = value
                    break;
                case 2:
                    nilai = value
                    break;
                case 3:
                    nilai = value
                    break;
                case 4:
                    nilai = value.substring(0,1)+","+value.substring(1)
                    break;
                case 5:
                    nilai = value.substring(0,2)+","+value.substring(2)
                    break
                case 6:
                    nilai = value.substring(0,3)+","+value.substring(3)
                    break;
                case 7:
                    nilai = value.substring(0,1)+","+value.substring(1,4)+","+value.substring(4)
                    break;
                case 6:
                    nilai = value.substring(0,2)+","+value.substring(1,4)+","+value.substring(4)
                    break;
            
                default:
                    nilai = '10,000,000'
                    break;
            }
            break;
    
        default:
            break;
    }
    return nilai;
}

export default numeric;