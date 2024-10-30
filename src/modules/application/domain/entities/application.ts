import { ApplicationStatus } from '../enums/application-status';
import { Advertisement } from './advertisement';

interface ApplicationProps {
  status?: ApplicationStatus;
  createdAt?: Date;
  applicantId: number;
  advertisementId: number;
  advertisement?: Advertisement;
}

export class Application {
  private _id: number;
  private props: ApplicationProps;

  constructor(props: ApplicationProps, id?: number) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get status() {
    return this.props.status;
  }

  public set status(status: ApplicationStatus) {
    this.props.status = status;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get applicantId() {
    return this.props.applicantId;
  }

  public set applicantId(applicantId: number) {
    this.props.applicantId = applicantId;
  }

  public get advertisementId() {
    return this.props.advertisementId;
  }

  public set advertisementId(advertisementId: number) {
    this.props.advertisementId = advertisementId;
  }

  public get advertisement() {
    return this.props.advertisement;
  }

  public set advertisement(advertisement: Advertisement) {
    this.props.advertisement = advertisement;
  }
}
