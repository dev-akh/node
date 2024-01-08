export class NotFoundError extends Error {

  public readonly name = 'NotFoundError';

  constructor(
    public readonly model: string,
    message?: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class RepositoryInternalError<E extends Error> extends Error {
  public readonly name = 'RepositoryInternalError';

  constructor(
    public err: E,
  ) {
    super(err.message);
    Object.setPrototypeOf(this, RepositoryInternalError.prototype);
  }
}
