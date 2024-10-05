interface RecipientProps {
  name: string;
}

export class Recipient {
  private _id: number;
  private props: RecipientProps;

  constructor(props: RecipientProps, id?: number) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }
}
