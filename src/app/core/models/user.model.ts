export interface Address {
	city_user: string;
	postal_code: string;
	address: string;
	country: string;
}

export interface ChargingPoint {
	code: number;
	desc: string;
	name: string;
	standard_name: string;
	image_url: string;
}

export interface ChargingCurve {
	power: number;
	percentage: number;
}

export interface Charger {
	ports: ChargingPoint[];
	max_power: number;
	charging_curve: ChargingCurve[];
	is_default_charging_curve: boolean;
}

export interface EnergyConsumption {
	average_consumption: number;
}

export interface VehicleModel {
	id: string;
	brand_id: string;
	model: string;
	release_year: number;
	variant: string;
	usable_battery_size: string;
	energy_consumption: EnergyConsumption;
	vehicle_type: string;
	type: string;
	ac_charger: Charger;
	dc_charger: Charger;
	image_url: string;
	has_autocharge: boolean;
}

export interface User {
	id: number;
	mail: string;
	id_tag: string;
	photo: string;
	groups: Group[];
	vehicles: Vehicle[];
	feature_flags: FeatureFlags;
	status: string;
	location: Address;
	privateInfo: PrivateInfo;
	paymentInfo: any[];
}

export interface Group {
	id: number;
	name: string;
}

export interface Vehicle {
	vehicleId: number;
	license_plate_number: string;
	model_id: string;
	is_favorite: boolean;
	vehicle_name: string;
	image_url: string;
	model: VehicleModel;
}

export interface FeatureFlags {
	subscriptions: boolean;
}

export interface FilterPreferences {
	connector_types_filter: any[]; // Update this type as per the actual data structure
	power_filter: string;
	include_external_filter: boolean;
	only_usable_filter: boolean;
	power_aliases_filter: any[]; // Update this type as per the actual data structure
}

export interface PrivateInfo {
	name: string;
	firstlastname: string;
	secondlastname: string;
	dni_type: string;
	dni: string;
	phone_number: string;
	autocharge_enabled: boolean;
	is_marketing_allowed: boolean;
	filter_preferences: FilterPreferences;
}
