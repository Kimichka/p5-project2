"""Added Game model

Revision ID: 37dbeb582f6c
Revises: a1ef55b943e8
Create Date: 2023-10-08 22:57:33.320078

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '37dbeb582f6c'
down_revision = 'a1ef55b943e8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('game',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('game')
    # ### end Alembic commands ###
