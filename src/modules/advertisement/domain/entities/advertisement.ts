import { Gender } from '@src/core/enums/gender';
import { BedroomType } from '../enums/bedroomtype';
import { User } from '@src/modules/user/domain/entities/user';
import { City } from './city';
import { State } from './state';

interface AdvertisementProps {
  title: string;
  description: string;
  price: number;
  genderPreference: Gender;
  allowOppositeGender: boolean;
  totalSlots: number;
  occupiedSlots: number;
  bedroomType: BedroomType;
  numBedroom: number;
  numBathroom: number;
  hasPet: boolean;
  owner?: User;
  ownerId: number;
  city?: City;
  cityId: number;
  state?: State;
  stateId: number;
}

export class Advertisement {
  private _id: number;
  private props: AdvertisementProps;

  constructor(props: AdvertisementProps, id?: number) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get description() {
    return this.props.description;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get price() {
    return this.props.price;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get genderPreference() {
    return this.props.genderPreference;
  }

  public set genderPreference(genderPreference: Gender) {
    this.props.genderPreference = genderPreference;
  }

  public get allowOppositeGender() {
    return this.props.allowOppositeGender;
  }

  public set allowOppositeGender(allowOppositeGender: boolean) {
    this.props.allowOppositeGender = allowOppositeGender;
  }

  public get totalSlots() {
    return this.props.totalSlots;
  }

  public set totalSlots(totalSlots: number) {
    this.props.totalSlots = totalSlots;
  }

  public get occupiedSlots() {
    return this.props.occupiedSlots;
  }

  public set occupiedSlots(occupiedSlots: number) {
    this.props.occupiedSlots = occupiedSlots;
  }

  public get bedroomType() {
    return this.props.bedroomType;
  }

  public set bedroomType(bedroomType: BedroomType) {
    this.props.bedroomType = bedroomType;
  }

  public get numBedroom() {
    return this.props.numBedroom;
  }

  public set numBedroom(numBedroom: number) {
    this.props.numBedroom = numBedroom;
  }

  public get numBathroom() {
    return this.props.numBathroom;
  }

  public set numBathroom(numBathroom: number) {
    this.props.numBathroom = numBathroom;
  }

  public get hasPet() {
    return this.props.hasPet;
  }

  public set hasPet(hasPet: boolean) {
    this.props.hasPet = hasPet;
  }

  public get owner() {
    return this.props.owner;
  }

  public set owner(owner: User) {
    this.props.owner = owner;
  }

  public get ownerId() {
    return this.props.ownerId;
  }

  public set ownerId(ownerId: number) {
    this.props.ownerId = ownerId;
  }

  public get city() {
    return this.props.city;
  }

  public set city(city: City) {
    this.props.city = city;
  }

  public get cityId() {
    return this.props.cityId;
  }

  public set cityId(cityId: number) {
    this.props.cityId = cityId;
  }

  public get state() {
    return this.props.state;
  }

  public set state(state: State) {
    this.props.state = state;
  }

  public get stateId() {
    return this.props.stateId;
  }

  public set stateId(stateId: number) {
    this.props.stateId = stateId;
  }
}
