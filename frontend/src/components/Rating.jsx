import {BsStar, BsStarHalf, BsStarFill} from 'react-icons/bs'

const Rating = ({ratingValue, reviews}) => {
    let stars = [];
    let fractionPart = ratingValue % 1;
    let integerPart = ratingValue - fractionPart;
    for(let i = 0 ; i < 5 ; i++){
        if(integerPart){
            integerPart--;
            stars.push(<span><BsStarFill/></span>);
        }
        else if(fractionPart){
            stars.push(<span><BsStarHalf/></span>);
            fractionPart = 0;
        }
        else
            stars.push(<span><BsStar/></span>);
    }
    return (
        <div>
            {stars}
            <span className='reviewText'> {reviews} reviews</span>
        </div>
    )
}

export default Rating;