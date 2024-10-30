interface AdvertisementProps {
  title: string;
  price: number;
  imgSrc: string;
  cityName: string;
  stateName: string;
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

  public get price() {
    return this.props.price;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get imgSrc() {
    return this.props.imgSrc;
  }

  public set imgSrc(imgSrc: string) {
    this.props.imgSrc = imgSrc;
  }

  public get cityName() {
    return this.props.cityName;
  }

  public set cityName(cityName: string) {
    this.props.cityName = cityName;
  }

  public get stateName() {
    return this.props.stateName;
  }

  public set stateName(stateName: string) {
    this.props.stateName = stateName;
  }
}
