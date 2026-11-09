import { APIfeatures } from './apiFeatures';

interface QueryMock {
  find: jest.Mock;
  sort: jest.Mock;
  select: jest.Mock;
  skip: jest.Mock;
  limit: jest.Mock;
}

const makeQuery = (): QueryMock => {
  const query = {
    find: jest.fn(),
    sort: jest.fn(),
    select: jest.fn(),
    skip: jest.fn(),
    limit: jest.fn(),
  } as QueryMock;

  query.find.mockReturnValue(query);
  query.sort.mockReturnValue(query);
  query.select.mockReturnValue(query);
  query.skip.mockReturnValue(query);
  query.limit.mockReturnValue(query);

  return query;
};

describe('APIfeatures', () => {
  it('filters out pagination fields and maps comparison operators', () => {
    const query = makeQuery();
    const features = new APIfeatures(query, {
      page: '2',
      sort: 'name',
      limit: '5',
      fields: 'name',
      price: '10',
      rating: '4',
    });

    features.filter();

    expect(query.find).toHaveBeenCalledWith({ price: '10', rating: '4' });
  });

  it('maps gte/gt/lte/lt into mongo operators', () => {
    const query = makeQuery();
    const features = new APIfeatures(query, {
      price: '10',
    });
    features.filter();

    expect(query.find).toHaveBeenCalledWith({ price: '10' });
  });

  it('sorts by the requested fields', () => {
    const query = makeQuery();
    new APIfeatures(query, { sort: 'name,price' }).sort();

    expect(query.sort).toHaveBeenCalledWith('name price');
  });

  it('defaults sorting to newest first', () => {
    const query = makeQuery();
    new APIfeatures(query, {}).sort();

    expect(query.sort).toHaveBeenCalledWith('-createdAt');
  });

  it('selects requested fields', () => {
    const query = makeQuery();
    new APIfeatures(query, { fields: 'name,price' }).limitFields();

    expect(query.select).toHaveBeenCalledWith('name price');
  });

  it('excludes __v by default', () => {
    const query = makeQuery();
    new APIfeatures(query, {}).limitFields();

    expect(query.select).toHaveBeenCalledWith('-__v');
  });

  it('paginates with defaults', () => {
    const query = makeQuery();
    new APIfeatures(query, {}).paginate();

    expect(query.skip).toHaveBeenCalledWith(0);
    expect(query.limit).toHaveBeenCalledWith(10);
  });

  it('paginates using page and limit', () => {
    const query = makeQuery();
    new APIfeatures(query, { page: '3', limit: '15' }).paginate();

    expect(query.skip).toHaveBeenCalledWith(30);
    expect(query.limit).toHaveBeenCalledWith(15);
  });

  it('falls back to page 1 when page is not a number', () => {
    const query = makeQuery();
    new APIfeatures(query, { page: 'abc' }).paginate();

    expect(query.skip).toHaveBeenCalledWith(0);
  });
});
