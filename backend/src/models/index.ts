import User from './User';
import Tender from './Tender';
import Offer from './Offer';

// Relations Definitions (UML Perspective)

// A User (Shipper) can create many Tenders
User.hasMany(Tender, { foreignKey: 'shipper_id', as: 'tenders' });
Tender.belongsTo(User, { foreignKey: 'shipper_id', as: 'shipper' });

// A User (Carrier) can make many Offers
User.hasMany(Offer, { foreignKey: 'carrier_id', as: 'offers' });
Offer.belongsTo(User, { foreignKey: 'carrier_id', as: 'carrier' });

// A Tender can have many Offers
Tender.hasMany(Offer, { foreignKey: 'tender_id', as: 'offers' });
Offer.belongsTo(Tender, { foreignKey: 'tender_id', as: 'tender' });

export {
    User,
    Tender,
    Offer
};
