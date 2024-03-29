import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Category
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryCategoryController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) { }

  @get('/api/categories/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to Category',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof Category.prototype.id,
  ): Promise<Category> {
    return this.categoryRepository.category(id);
  }
}
