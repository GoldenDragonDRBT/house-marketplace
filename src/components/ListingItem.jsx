import { Link } from 'react-router-dom';
// import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';
import DeleteIcon from '../assets/svg/svgComponents/DeleteIcon';
import EditIcon from '../assets/svg/svgComponents/EditIcon';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';

function ListingItem({ listing, id, onDelete, onEdit }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/category/${listing.type}/${id}`}
        className='categoryListingLink'
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listing.location}</p>
          <p className='categoryListingName'>{listing.name}</p>

          <p className='categoryListingPrice'>
            $
            {listing.offer
              ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && ' / Month'}
          </p>
          <div className='categoryListingInfoDiv'>
            <img src={bedIcon} alt='bed' />
            <p className='categoryListingInfoText'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
            <img src={bathtubIcon} alt='bath' />
            <p className='categoryListingInfoText'>
              {listing.bedrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <button className='removeIcon' onClick={onDelete} aria-label={`Delete ${listing.name}`}>
          <DeleteIcon
          // className='removeIcon'
          // fill='rgb(231,76,60)' // Modified in "jsx" component
          // onClick={() => onDelete(listing.id, listing.name)}
          // color='rgb(231,76,60)'
          // onClick={onDelete}
          />
        </button>
      )}

      {onEdit && (
        <button className='editIcon' onClick={onEdit} aria-label={`Edit ${listing.name}`}>
          <EditIcon className='editIcon' onClick={() => onEdit(id)} />
        </button>
      )}
    </li>
  );
}
export default ListingItem;
