import { relations } from "drizzle-orm/relations";
import { farmers, farmerCustomerOrders, customers, crops, farmerCustomerFeedbacks, vendorFarmerFeedbacks, vendors, vendorFarmerOrders, products, vendorProducts, farmerCrops, farmerInventories, vendorInventories } from "./schema";

export const farmerCustomerOrdersRelations = relations(farmerCustomerOrders, ({one}) => ({
	farmer: one(farmers, {
		fields: [farmerCustomerOrders.farmerId],
		references: [farmers.farmerId]
	}),
	customer: one(customers, {
		fields: [farmerCustomerOrders.customerId],
		references: [customers.customerId]
	}),
	crop: one(crops, {
		fields: [farmerCustomerOrders.cropId],
		references: [crops.cropId]
	}),
}));

export const farmersRelations = relations(farmers, ({many}) => ({
	farmerCustomerOrders: many(farmerCustomerOrders),
	farmerCustomerFeedbacks: many(farmerCustomerFeedbacks),
	vendorFarmerFeedbacks: many(vendorFarmerFeedbacks),
	vendorFarmerOrders: many(vendorFarmerOrders),
	farmerCrops: many(farmerCrops),
	farmerInventories: many(farmerInventories),
}));

export const customersRelations = relations(customers, ({many}) => ({
	farmerCustomerOrders: many(farmerCustomerOrders),
	farmerCustomerFeedbacks: many(farmerCustomerFeedbacks),
}));

export const cropsRelations = relations(crops, ({many}) => ({
	farmerCustomerOrders: many(farmerCustomerOrders),
	farmerCrops: many(farmerCrops),
	farmerInventories: many(farmerInventories),
}));

export const farmerCustomerFeedbacksRelations = relations(farmerCustomerFeedbacks, ({one}) => ({
	farmer: one(farmers, {
		fields: [farmerCustomerFeedbacks.farmerId],
		references: [farmers.farmerId]
	}),
	customer: one(customers, {
		fields: [farmerCustomerFeedbacks.customerId],
		references: [customers.customerId]
	}),
}));

export const vendorFarmerFeedbacksRelations = relations(vendorFarmerFeedbacks, ({one}) => ({
	farmer: one(farmers, {
		fields: [vendorFarmerFeedbacks.farmerId],
		references: [farmers.farmerId]
	}),
	vendor: one(vendors, {
		fields: [vendorFarmerFeedbacks.vendorId],
		references: [vendors.vendorId]
	}),
}));

export const vendorsRelations = relations(vendors, ({many}) => ({
	vendorFarmerFeedbacks: many(vendorFarmerFeedbacks),
	vendorFarmerOrders: many(vendorFarmerOrders),
	vendorProducts: many(vendorProducts),
	vendorInventories: many(vendorInventories),
}));

export const vendorFarmerOrdersRelations = relations(vendorFarmerOrders, ({one}) => ({
	vendor: one(vendors, {
		fields: [vendorFarmerOrders.vendorId],
		references: [vendors.vendorId]
	}),
	farmer: one(farmers, {
		fields: [vendorFarmerOrders.farmerId],
		references: [farmers.farmerId]
	}),
	product: one(products, {
		fields: [vendorFarmerOrders.productId],
		references: [products.productId]
	}),
}));

export const productsRelations = relations(products, ({many}) => ({
	vendorFarmerOrders: many(vendorFarmerOrders),
	vendorProducts: many(vendorProducts),
	vendorInventories: many(vendorInventories),
}));

export const vendorProductsRelations = relations(vendorProducts, ({one}) => ({
	vendor: one(vendors, {
		fields: [vendorProducts.vendorId],
		references: [vendors.vendorId]
	}),
	product: one(products, {
		fields: [vendorProducts.productId],
		references: [products.productId]
	}),
}));

export const farmerCropsRelations = relations(farmerCrops, ({one}) => ({
	farmer: one(farmers, {
		fields: [farmerCrops.farmerId],
		references: [farmers.farmerId]
	}),
	crop: one(crops, {
		fields: [farmerCrops.cropId],
		references: [crops.cropId]
	}),
}));

export const farmerInventoriesRelations = relations(farmerInventories, ({one}) => ({
	farmer: one(farmers, {
		fields: [farmerInventories.farmerId],
		references: [farmers.farmerId]
	}),
	crop: one(crops, {
		fields: [farmerInventories.cropId],
		references: [crops.cropId]
	}),
}));

export const vendorInventoriesRelations = relations(vendorInventories, ({one}) => ({
	vendor: one(vendors, {
		fields: [vendorInventories.vendorId],
		references: [vendors.vendorId]
	}),
	product: one(products, {
		fields: [vendorInventories.productId],
		references: [products.productId]
	}),
}));