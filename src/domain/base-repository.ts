export interface BaseRepository<T> {
  getOne(id: string | number): Promise<T>;
  
  getAll(): Promise<T[]>;

  persist(data: T): Promise<T>;
}
