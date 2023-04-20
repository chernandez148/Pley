"""message

Revision ID: c750052291af
Revises: 
Create Date: 2023-04-20 12:29:01.859114

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c750052291af'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fname', sa.String(), nullable=True),
    sa.Column('lname', sa.String(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(length=128), nullable=True),
    sa.Column('completed_business_form', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('business',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('business_name', sa.String(), nullable=True),
    sa.Column('business_number', sa.String(), nullable=True),
    sa.Column('business_image', sa.String(), nullable=True),
    sa.Column('business_address', sa.String(), nullable=True),
    sa.Column('business_city', sa.String(), nullable=True),
    sa.Column('business_state', sa.String(), nullable=True),
    sa.Column('business_zipcode', sa.Integer(), nullable=True),
    sa.Column('business_category', sa.Enum('Food & Dining', 'Automotive', 'Retailer', 'Computers & Electronics', 'Entertainment', 'Health & Medicine', 'Education', 'Home & Garden', 'Legal & Financial', 'Manufacturing, Wholesale, Distribution', 'Personal Care & Services', 'Real Estate', 'Travel & Transportation', 'Other'), nullable=False),
    sa.Column('business_description', sa.String(), nullable=True),
    sa.Column('business_owner', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['business_owner'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('business_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['business_id'], ['business.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('business')
    op.drop_table('users')
    # ### end Alembic commands ###
