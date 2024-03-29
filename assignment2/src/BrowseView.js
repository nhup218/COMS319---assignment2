export function Browse(product, price, picture) {
  return (
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col">
            <div class="card shadow-sm">
              <img
                class="bd-placeholder-img card-img-top"
                src={picture}
                alt={product}
                width="100%"
                height="225"
              ></img>
              <div class="card-body">
                <h4 class="card-text">{product}</h4>
                <p class="card-text">{price}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      -
                    </button>
                  </div>
                  <small class="text-body-secondary">Quanity</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
